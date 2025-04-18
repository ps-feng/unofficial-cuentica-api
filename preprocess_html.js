const puppeteer = require('puppeteer');
const fs = require('fs');

async function extractCuenticaHTML() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  
  // Navigate to the API docs page
  await page.goto('https://apidocs.cuentica.com/', { waitUntil: 'networkidle2' });
  
  console.log('Expanding all collapsed sections...');
  
  // Click all "Mostrar +" links until there are no more
  let attempts = 0;
  const maxAttempts = 5;
  let previousCount = 0;
  
  while (attempts < maxAttempts) {
    // Use JavaScript to find and click all "Mostrar +" links
    const clickCount = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a')).filter(link => 
        link.textContent.trim() === 'Mostrar +' && 
        link.offsetParent !== null // Only visible links
      );
      
      if (links.length === 0) return 0;
      
      links.forEach(link => {
        // Create and dispatch a click event
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        link.dispatchEvent(clickEvent);
      });
      
      return links.length;
    });

    if (clickCount === 0) {
      console.log('All sections expanded!');
      break;
    }
    
    // If we're not making progress, increment attempts
    if (clickCount === previousCount) {
      attempts++;
      console.log(`Attempt ${attempts} of ${maxAttempts} - Found ${clickCount} sections to expand`);
    } else {
      attempts = 0; // Reset attempts if we're making progress
      console.log(`Expanding ${clickCount} sections...`);
    }
    
    previousCount = clickCount;
    
    // Wait for any potential AJAX requests and animations
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.waitForNetworkIdle({ timeout: 2000 }).catch(() => {});
  }
  
  if (attempts >= maxAttempts) {
    console.log('Warning: Could not expand all sections after maximum attempts');
  }

  // Get the final HTML content
  const htmlContent = await page.evaluate(() => {
    return document.documentElement.outerHTML;
  });

  // Write the HTML file
  fs.writeFileSync('intermediate/cuentica_api_expanded.html', htmlContent);
  console.log('Expanded HTML content saved to cuentica_api_expanded.html');
  
  await browser.close();
}

extractCuenticaHTML().catch(console.error);
