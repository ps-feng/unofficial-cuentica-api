[![](https://apidocs.cuentica.com/resources/images/cuentica-logo-white.svg)API DOCS](https://apidocs.cuentica.com/)

[![](https://apidocs.cuentica.com/resources/images/cuentica-logo.svg)API DOCS](https://apidocs.cuentica.com/)

- Introducción

- Autenticación

- Limite de peticiones

- Paginación

- Empresa

  - /company
  - /company/serie

- Cuenta

  - /account
  - /account/:id

- Proveedor

  - /provider
  - /provider/:id

- Cliente

  - /customer
  - /customer/:id

- Factura

  - /invoice
  - /invoice/:id
  - /invoice/:id/public
  - /invoice/:id/charges
  - /invoice/:id/email
  - /invoice/:id/pdf

- Ingreso

  - /income
  - /income/:id
  - /income/:id/attachment
  - /income/:id/charges

- Gasto

  - /expense
  - /expense/:id
  - /expense/:id/attachment
  - /expense/:id/payments

- Documento

  - /document
  - /document/:id
  - /document/:id/attachment

- Etiqueta

  - /tag

- Traspaso

  - /transfer
  - /transfer/:id

- Subentidades

  - Linea de factura
  - Linea de ingreso
  - Cobro de factura
  - Linea de gasto
  - Pago de gasto
  - Detalles de inversion
  - Adjunto

- Regiones

- Tipos de gasto

- Tipos de inversión

- Tipos de ingreso

- Tipos de venta

- Tipos de operación

- Tipos de sujeción de IVA

- Errores

## Introducción

Bienvenido al sitio web de documentación del API de [Cuéntica](https://cuentica.com/).

Puedes usar el API para acceder a todas las funcionalidades del sistema, pensadas para facilitar el control y la gestión contable y fiscal de los autónomos y pequeñas empresas.

El API usa la arquitectura `REST`, que nos permite ofrecer el servicio de una manera estándar, comprensible y con URL’s orientadas a recursos. Usamos las funcionalidades que nos ofrece `HTTP` (Autenticación HTTP, verbos para expresar las acciones y códigos de respuesta) y como formato de respuesta usamos `JSON` por ser uno de los más extendidos y de mejor lectura.

## Autenticación

Para autenticarte con nuestra API necesitas enviarnos el token como parte de la cabecera de las peticiones.

Consulta el artículo sobre [cómo crear una empresa sandbox y los tokens de acceso](https://como-se-hace.cuentica.com/configuracion-y-cuenta-de-usuario/uso-del-api-como-crear-una-empresa-sandbox-y-tokens-de-acceso) para más información.

**La asignación del token es por usuario y por empresa**, por lo que una aplicación cliente puede tener permisos para acceder sólo a una de las empresas de un usuario y no al resto.

La cabecera que comprobamos es `X-AUTH-TOKEN`. En caso de que no esté incluída o sea errónea, será devuelto un error `403`.

## Limite de peticiones

El limite de peticiones que aceptamos son:

- 600 peticiones cada 5 minutos.
- 7200 peticiones al día.

Este limite puede ser cambiado en el futuro, pero en todo caso mantendremos un limite que permita hacer un uso responsable del API y que se ajuste a los casos de uso de los usuarios.

**Headers de la respuesta:**

| Nombre | Descripción |
| --- | --- |
| X-RateLimit-Limit | Numero de petición actual. |
| X-RateLimit-Remaining | Peticiones restantes para el bloque actual. |
| X-RateLimit-Reset | Fecha y hora de fin de este bloque de peticiones (Formato epoch). |
| X-RateLimit-Daily-Limit | Numero diario de peticiones. |
| X-RateLimit-Daily-Remaining | Peticiones restantes en el día |
| X-RateLimit-Daily-Reset | Fecha y hora de siguiente día (Formato epoch). |

## Paginación

El limite máximo de items que se pueden devolver en una consulta es **300**.

Las rutas que aceptan paginación son:

- get /invoice
- get /expense
- get /provider
- get /customer

**Headers de la respuesta:**

| Nombre | Descripción |
| --- | --- |
| X-Pagination-CurrentPage | Pagina que se ha recibido |
| X-Pagination-PageSize | Numero de elementos por página |
| X-Pagination-TotalElements | Elementos totales del recurso que se esta pidiendo, despues de aplicar filtros si los hubiera |

## Empresa

### /company

#### get

```

curl --request GET \
  --url https://api.cuentica.com/company

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/company")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/company")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/company",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/company")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/company');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/company"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener los datos de tu negocio.

```
Respuesta:Mostrar + {...}
```

### /company/serie

#### get

```

curl --request GET \
  --url https://api.cuentica.com/company/serie

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/company/serie")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/company/serie")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/company/serie",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/company/serie")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/company/serie');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/company/serie"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener las series de facturación de tu negocio.

```
Respuesta:Mostrar + [ ... ]
```

## Cuenta

### /account

#### get

```

curl --request GET \
  --url https://api.cuentica.com/account

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/account")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/account")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/account",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/account")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/account');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/account"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener una lista de cuentas de la empresa (cuentas bancarias, tarjetas de débito/crédito y cuentas de socios).

```
Respuesta:Mostrar + [ ... ]
```

### /account/:id

#### get

```

curl --request GET \
  --url https://api.cuentica.com/account/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/account/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/account/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/account/:id",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/account/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/account/:id');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/account/:id"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener cuenta de la empresa que corresponde con el `id` pasado como parámetro.

```
Respuesta:Mostrar + {...}
```

## Proveedor

### /provider

#### get

```

curl --request GET \
  --url https://api.cuentica.com/provider

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/provider")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/provider")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/provider",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/provider")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/provider');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/provider"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener lista de proveedores.

- **Parámetros opcionales en la URL:**

| Nombre | Descripción |
| --- | --- |
| page\_size | Número de elementos que quieren obtenerse por página. |
| page | Página que se quiere obtener. |
| q | Devolverá los elementos que contengan el texto en cualquiera de los siguientes campos: razón social, dirección, cif, teléfono e email. |

```
Respuesta:Mostrar + [ ... ]
```

#### post

```

curl --request POST \
  --url https://api.cuentica.com/provider \
  --data '{"default_retention":0,"default_expense_type":"600"}'

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/provider")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request.body = "{\"default_retention\":0,\"default_expense_type\":\"600\"}"

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

payload = "{\"default_retention\":0,\"default_expense_type\":\"600\"}"

conn.request("POST", "/provider", payload)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/provider",
  "method": "POST",
  "headers": {},
  "processData": false,
  "data": "{\"default_retention\":0,\"default_expense_type\":\"600\"}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.post("https://api.cuentica.com/provider")
  .body("{\"default_retention\":0,\"default_expense_type\":\"600\"}")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/provider');
$request->setMethod(HTTP_METH_POST);

$request->setBody('{"default_retention":0,"default_expense_type":"600"}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "strings"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/provider"

    payload := strings.NewReader("{\"default_retention\":0,\"default_expense_type\":\"600\"}")

    req, _ := http.NewRequest("POST", url, payload)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Añadir un nuevo proveedor.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`address`** string | Dirección de la empresa, calle, número, piso… |
| **`town`** string | Población. |
| **`postal_code`** string | Código postal. |
| **`cif`** string | Identificación única de la empresa, si ya existe una empresa con este número no podrá realizarse el registro. Si la empresa es extracomunitaria, se permite que el campo esté vacío, pero el parámetro deberá enviarse siempre. |
| **`tradename`** string | Nombre comercial. <br>Si el campo `business_type` es `individual` y este campo no se envía se autogenerará. |
| **`business_name`** string | Razón social. <br>Obligatorio si el campo `business_type` **no** es `individual`. |
| **`name`** string | Obligatorio si el campo `business_type` es `individual`. |
| **`surname_1`** string | Obligatorio si el campo `business_type` es `individual`. |
| **`business_type`** string | **Valores aceptados:**<br>individual, company, others<br>**Detalle:**<br>`individual` -\> Persona física, freelance…<br>`company` -\> Sociedad (SL, SA, SC, SLL, SLU)<br>`others` -\> Comunidad de bienes, instituciones… |
| **`region`** string | [Valores aceptados si el país es España](https://apidocs.cuentica.com/versions/latest_release/#regiones)<br>**Detalle:**<br>Provincia. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`surname_2`** string | Usado si el campo `business_type` es `individual`. |
| **`country_code`** string | Código del país en formato ISO 3166-1 (dos letras)<br>Por defecto `ES` |
| **`default_payment_method`** string | **Valores aceptados:**<br>cash, receipt, wire\_transfer, card, promissory\_note, other<br>**Detalle:**<br>Este es el método de pago por defecto asociado a esta empresa.<br>Se usará en caso de no enviar un valor en las operaciones relacionadas con esta empresa. |
| **`fax`** string | Número de fax. |
| **`phone`** string | Número de teléfono. |
| **`web`** string | Url de la empresa. |
| **`email`** string | Correo electrónico. |
| **`contact_person`** string | Persona de contacto. |
| **`personal_comment`** string | Comentario personal. |
| **`default_retention`** number | IRPF por defecto que se aplicará a las operaciones con el proveedor |
| **`default_expense_type`** string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-gasto) |

```
Respuesta:Mostrar + {...}
```

### /provider/:id

#### get

```

curl --request GET \
  --url https://api.cuentica.com/provider/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/provider/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/provider/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/provider/:id",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/provider/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/provider/:id');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/provider/:id"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el proveedor que corresponde con el id pasado como parámetro.

```
Respuesta:Mostrar + {...}
```

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/provider/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/provider/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/provider/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/provider/:id",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/provider/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/provider/:id');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/provider/:id"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar un proveedor.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`address`** string | Dirección de la empresa, calle, número, piso… |
| **`town`** string | Población. |
| **`postal_code`** string | Código postal. |
| **`cif`** string | Identificación única de la empresa, si ya existe una empresa con este número no podrá realizarse el registro. Si la empresa es extracomunitaria, se permite que el campo esté vacío, pero el parámetro deberá enviarse siempre. |
| **`tradename`** string | Nombre comercial. <br>Si el campo `business_type` es `individual` y este campo no se envía se autogenerará. |
| **`business_name`** string | Razón social. <br>Obligatorio si el campo `business_type` **no** es `individual`. |
| **`name`** string | Obligatorio si el campo `business_type` es `individual`. |
| **`surname_1`** string | Obligatorio si el campo `business_type` es `individual`. |
| **`business_type`** string | **Valores aceptados:**<br>individual, company, others<br>**Detalle:**<br>`individual` -\> Persona física, freelance…<br>`company` -\> Sociedad (SL, SA, SC, SLL, SLU)<br>`others` -\> Comunidad de bienes, instituciones… |
| **`region`** string | [Valores aceptados si el país es España](https://apidocs.cuentica.com/versions/latest_release/#regiones)<br>**Detalle:**<br>Provincia. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`surname_2`** string | Usado si el campo `business_type` es `individual`. |
| **`country_code`** string | Código del país en formato ISO 3166-1 (dos letras)<br>Por defecto `ES` |
| **`default_payment_method`** string | **Valores aceptados:**<br>cash, receipt, wire\_transfer, card, promissory\_note, other<br>**Detalle:**<br>Este es el método de pago por defecto asociado a esta empresa.<br>Se usará en caso de no enviar un valor en las operaciones relacionadas con esta empresa. |
| **`fax`** string | Número de fax. |
| **`phone`** string | Número de teléfono. |
| **`web`** string | Url de la empresa. |
| **`email`** string | Correo electrónico. |
| **`contact_person`** string | Persona de contacto. |
| **`personal_comment`** string | Comentario personal. |
| **`default_retention`** number | IRPF por defecto que se aplicará a las operaciones con el proveedor |
| **`default_expense_type`** string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-gasto) |

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/provider/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/provider/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/provider/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/provider/:id",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/provider/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/provider/:id');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/provider/:id"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar un proveedor.

- Respuesta: Status 200


## Cliente

### /customer

#### get

```

curl --request GET \
  --url https://api.cuentica.com/customer

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/customer")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/customer")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/customer",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/customer")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/customer');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/customer"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener lista de clientes.

- **Parámetros opcionales en la URL:**

| Nombre | Descripción |
| --- | --- |
| page\_size | Número de elementos que quieren obtenerse por página. |
| page | Página que se quiere obtener. |
| q | Devolverá los elementos que contengan el texto en cualquiera de los siguientes campos: razón social, dirección, cif, teléfono e email. |

```
Respuesta:Mostrar + [ ... ]
```

#### post

```

curl --request POST \
  --url https://api.cuentica.com/customer \
  --data '{"default_invoice_language":"default","has_surcharge":false}'

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/customer")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request.body = "{\"default_invoice_language\":\"default\",\"has_surcharge\":false}"

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

payload = "{\"default_invoice_language\":\"default\",\"has_surcharge\":false}"

conn.request("POST", "/customer", payload)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/customer",
  "method": "POST",
  "headers": {},
  "processData": false,
  "data": "{\"default_invoice_language\":\"default\",\"has_surcharge\":false}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.post("https://api.cuentica.com/customer")
  .body("{\"default_invoice_language\":\"default\",\"has_surcharge\":false}")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/customer');
$request->setMethod(HTTP_METH_POST);

$request->setBody('{"default_invoice_language":"default","has_surcharge":false}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "strings"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/customer"

    payload := strings.NewReader("{\"default_invoice_language\":\"default\",\"has_surcharge\":false}")

    req, _ := http.NewRequest("POST", url, payload)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Añadir un nuevo cliente.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`address`** string | Dirección de la empresa, calle, número, piso… |
| **`town`** string | Población. |
| **`postal_code`** string | Código postal. |
| **`cif`** string | Identificación única de la empresa, si ya existe una empresa con este número no podrá realizarse el registro. Si la empresa es extracomunitaria, se permite que el campo esté vacío, pero el parámetro deberá enviarse siempre. |
| **`tradename`** string | Nombre comercial. <br>Si el campo `business_type` es `individual` y este campo no se envía se autogenerará. |
| **`business_name`** string | Razón social. <br>Obligatorio si el campo `business_type` **no** es `individual`. |
| **`name`** string | Obligatorio si el campo `business_type` es `individual`. |
| **`surname_1`** string | Obligatorio si el campo `business_type` es `individual`. |
| **`business_type`** string | **Valores aceptados:**<br>individual, company, others<br>**Detalle:**<br>`individual` -\> Persona física, freelance…<br>`company` -\> Sociedad (SL, SA, SC, SLL, SLU)<br>`others` -\> Comunidad de bienes, instituciones… |
| **`region`** string | [Valores aceptados si el país es España](https://apidocs.cuentica.com/versions/latest_release/#regiones)<br>**Detalle:**<br>Provincia. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`surname_2`** string | Usado si el campo `business_type` es `individual`. |
| **`country_code`** string | Código del país en formato ISO 3166-1 (dos letras)<br>Por defecto `ES` |
| **`default_payment_method`** string | **Valores aceptados:**<br>cash, receipt, wire\_transfer, card, promissory\_note, other<br>**Detalle:**<br>Este es el método de pago por defecto asociado a esta empresa.<br>Se usará en caso de no enviar un valor en las operaciones relacionadas con esta empresa. |
| **`fax`** string | Número de fax. |
| **`phone`** string | Número de teléfono. |
| **`web`** string | Url de la empresa. |
| **`email`** string | Correo electrónico. |
| **`contact_person`** string | Persona de contacto. |
| **`personal_comment`** string | Comentario personal. |
| **`default_invoice_language`** string | **Valores aceptados:**<br>default, es, eu, ca, en<br>**Detalle:**<br>Idioma por defecto que se usará en las facturas que se emitan a este cliente, y que no reciban el campo `invoice_language`.<br>`default` -\> Valor por defecto de la empresa<br>`es` -\> Español<br>`eu` -\> Euskera<br>`ca` -\> Catalan<br>`en` -\> Inglés |
| **`has_surcharge`** boolean | Define si las facturas del cliente van a tener recargo de equivalencia por defecto. |

```
Respuesta:Mostrar + {...}
```

### /customer/:id

#### get

```

curl --request GET \
  --url https://api.cuentica.com/customer/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/customer/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/customer/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/customer/:id",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/customer/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/customer/:id');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/customer/:id"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el cliente que corresponde con el id pasado como parámetro.

```
Respuesta:Mostrar + {...}
```

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/customer/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/customer/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/customer/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/customer/:id",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/customer/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/customer/:id');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/customer/:id"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar un cliente.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`address`** string | Dirección de la empresa, calle, número, piso… |
| **`town`** string | Población. |
| **`postal_code`** string | Código postal. |
| **`cif`** string | Identificación única de la empresa, si ya existe una empresa con este número no podrá realizarse el registro. Si la empresa es extracomunitaria, se permite que el campo esté vacío, pero el parámetro deberá enviarse siempre. |
| **`tradename`** string | Nombre comercial. <br>Si el campo `business_type` es `individual` y este campo no se envía se autogenerará. |
| **`business_name`** string | Razón social. <br>Obligatorio si el campo `business_type` **no** es `individual`. |
| **`name`** string | Obligatorio si el campo `business_type` es `individual`. |
| **`surname_1`** string | Obligatorio si el campo `business_type` es `individual`. |
| **`business_type`** string | **Valores aceptados:**<br>individual, company, others<br>**Detalle:**<br>`individual` -\> Persona física, freelance…<br>`company` -\> Sociedad (SL, SA, SC, SLL, SLU)<br>`others` -\> Comunidad de bienes, instituciones… |
| **`region`** string | [Valores aceptados si el país es España](https://apidocs.cuentica.com/versions/latest_release/#regiones)<br>**Detalle:**<br>Provincia. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`surname_2`** string | Usado si el campo `business_type` es `individual`. |
| **`country_code`** string | Código del país en formato ISO 3166-1 (dos letras)<br>Por defecto `ES` |
| **`default_payment_method`** string | **Valores aceptados:**<br>cash, receipt, wire\_transfer, card, promissory\_note, other<br>**Detalle:**<br>Este es el método de pago por defecto asociado a esta empresa.<br>Se usará en caso de no enviar un valor en las operaciones relacionadas con esta empresa. |
| **`fax`** string | Número de fax. |
| **`phone`** string | Número de teléfono. |
| **`web`** string | Url de la empresa. |
| **`email`** string | Correo electrónico. |
| **`contact_person`** string | Persona de contacto. |
| **`personal_comment`** string | Comentario personal. |
| **`default_invoice_language`** string | **Valores aceptados:**<br>default, es, eu, ca, en<br>**Detalle:**<br>Idioma por defecto que se usará en las facturas que se emitan a este cliente, y que no reciban el campo `invoice_language`.<br>`default` -\> Valor por defecto de la empresa<br>`es` -\> Español<br>`eu` -\> Euskera<br>`ca` -\> Catalan<br>`en` -\> Inglés |
| **`has_surcharge`** boolean | Define si las facturas del cliente van a tener recargo de equivalencia por defecto. |

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/customer/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/customer/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/customer/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/customer/:id",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/customer/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/customer/:id');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/customer/:id"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar un cliente.

- Respuesta: Status 200


## Factura

### /invoice

#### get

```

curl --request GET \
  --url https://api.cuentica.com/invoice

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/invoice")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/invoice")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener lista de facturas.

- **Parámetros opcionales en la URL:**

| Nombre | Descripción |
| --- | --- |
| page\_size | Número de elementos que quieren obtenerse por página. |
| page | Página que se quiere obtener. |
| customer | Id del cliente. |
| min\_total\_limit | Los elementos del listado tendrán un total superior a esta cantidad. |
| max\_total\_limit | Los elementos tendrán un total inferior a esta cantidad. |
| initial\_date | Los elementos tendrán una fecha superior a esta.<br>Con formato yyyy-MM-dd. |
| end\_date | Los elementos tendrán una fecha inferior a esta.<br>Con formato yyyy-MM-dd. |
| serie | Devolverá las facturas pertenecientes a dicha serie de facturación.<br>El valor de este parametro es el name que se recibe al llamar a /company/serie |
| description | Devolverá las facturas que contenga parte de la descripción. |
| issued | `true` -\> factura emitida<br>`false` -\> borrador |
| sort | Es una lista con los valores por los que se quiere ordenar, con el formato:<br>sort=key:order,key:order,key:order<br>Las `key` válidas son:<br> \\* customer -> Ordenar alfabéticamente por cliente.<br> \\* description -> Ordenar alfabéticamente por descripción.<br> \\* total\_base -> Ordenar por total de la base de la factura.<br> \\* total\_invoice -> Ordenar por total de factura.<br> \\* number -> Ordenar por número.<br> \\* date -> Ordenar por fecha.<br>Los `order` válidos son:<br> \\* desc -> Mayor a menor.<br> \\* asc -> Menor a mayor. |
| tags | Lista de tags por los que se quiere buscar:<br>tag\_1,tag\_2<br>Se devolverán lso resultados que contengan Todos los tags |

```
Respuesta:Mostrar + [ ... ]
```

#### post

```

curl --request POST \
  --url https://api.cuentica.com/invoice \
  --data '{"description":"<ADD STRING VALUE>","annotations":"<ADD STRING VALUE>","date":"<ADD STRING VALUE>","serie":"<ADD STRING VALUE>","tags":["<ADD STRING VALUE>"],"issued":false,"number":0,"customer":0,"footer":"Configuración del usuario.","irm":"Configuración del usuario.","invoice_lines":[{"quantity":0,"concept":"<ADD STRING VALUE>","amount":0,"discount":0,"tax":0,"surcharge":0,"retention":0,"sell_type":"service","tax_regime":"01","tax_subjection_code":"S1"}],"charges":[{"date":"<ADD STRING VALUE>","amount":0,"payment_method":"cash","origin_account":"<ADD STRING VALUE>","destination_account":0,"paid":false}]}'

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request.body = "{\"description\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"date\":\"<ADD STRING VALUE>\",\"serie\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"issued\":false,\"number\":0,\"customer\":0,\"footer\":\"Configuración del usuario.\",\"irm\":\"Configuración del usuario.\",\"invoice_lines\":[{\"quantity\":0,\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"discount\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"sell_type\":\"service\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}"

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

payload = "{\"description\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"date\":\"<ADD STRING VALUE>\",\"serie\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"issued\":false,\"number\":0,\"customer\":0,\"footer\":\"Configuración del usuario.\",\"irm\":\"Configuración del usuario.\",\"invoice_lines\":[{\"quantity\":0,\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"discount\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"sell_type\":\"service\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}"

conn.request("POST", "/invoice", payload)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice",
  "method": "POST",
  "headers": {},
  "processData": false,
  "data": "{\"description\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"date\":\"<ADD STRING VALUE>\",\"serie\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"issued\":false,\"number\":0,\"customer\":0,\"footer\":\"Configuración del usuario.\",\"irm\":\"Configuración del usuario.\",\"invoice_lines\":[{\"quantity\":0,\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"discount\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"sell_type\":\"service\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.post("https://api.cuentica.com/invoice")
  .body("{\"description\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"date\":\"<ADD STRING VALUE>\",\"serie\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"issued\":false,\"number\":0,\"customer\":0,\"footer\":\"Configuración del usuario.\",\"irm\":\"Configuración del usuario.\",\"invoice_lines\":[{\"quantity\":0,\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"discount\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"sell_type\":\"service\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice');
$request->setMethod(HTTP_METH_POST);

$request->setBody('{"description":"<ADD STRING VALUE>","annotations":"<ADD STRING VALUE>","date":"<ADD STRING VALUE>","serie":"<ADD STRING VALUE>","tags":["<ADD STRING VALUE>"],"issued":false,"number":0,"customer":0,"footer":"Configuración del usuario.","irm":"Configuración del usuario.","invoice_lines":[{"quantity":0,"concept":"<ADD STRING VALUE>","amount":0,"discount":0,"tax":0,"surcharge":0,"retention":0,"sell_type":"service","tax_regime":"01","tax_subjection_code":"S1"}],"charges":[{"date":"<ADD STRING VALUE>","amount":0,"payment_method":"cash","origin_account":"<ADD STRING VALUE>","destination_account":0,"paid":false}]}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "strings"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice"

    payload := strings.NewReader("{\"description\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"date\":\"<ADD STRING VALUE>\",\"serie\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"issued\":false,\"number\":0,\"customer\":0,\"footer\":\"Configuración del usuario.\",\"irm\":\"Configuración del usuario.\",\"invoice_lines\":[{\"quantity\":0,\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"discount\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"sell_type\":\"service\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}")

    req, _ := http.NewRequest("POST", url, payload)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Añadir una nueva factura.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`issued`** boolean | Este parámetro define si es un borrador o una factura emitida. |
| **`invoice_lines`** array | [Lineas de factura](https://apidocs.cuentica.com/versions/latest_release/#linea-de-factura) |
| **`charges`** array | [Cobros](https://apidocs.cuentica.com/versions/latest_release/#cobro-de-factura)<br>**Detalle:**<br>La suma de los cobros debe ser igual que el total de la factura. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`description`** string |  |
| **`annotations`** string |  |
| **`date`** string | Fecha de facturación<br>Formato: yyyy-MM-dd<br>Debe ser superior o igual a la fecha de la ultima factura emitida ese año con la misma serie, si no se envía fecha se usará la fecha de la petición. |
| **`serie`** string | Nombre de la serie de facturación, si no se envía se creará en la serie de facturación por defecto. |
| **`tags`** array | Las etiquetas que quieres que se asignen a la factura.<br>Si no existen se crearán. |
| **`number`** integer | Número de factura<br>Si es la primera factura del año y de la serie se cogerá este como el primer numero de factura.<br>Si ya existe una factura con la misma serie y se envía este parametro la petición fallará si no es el que le correspondería. |
| **`customer`** integer | `Id` del cliente al que se emite la factura. Si no se envía un cliente se usará “Clientes varios”. Si la serie de la factura es IVA-OSS deberá ser un cliente de un país de la UE y no español. |
| **`footer`** string | Pie de factura por defecto del usuario, que configuró en su panel de administración. |
| **`irm`** string | Campo IRM por defecto del usuario para las facturas, que configuró en su panel de administración. |

- **Detalle de la respuesta:**

| Nombre | Descripción |
| --- | --- |
| business.business\_name | Este campo solo se devuelve si el tipo de la empresa **no** es `individual` |
| business.name | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| business.surname\_1 | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| business.surname\_2 | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| charges.origin\_account\_number | Este campo se devuelve dependiendo delmétodoo de pago |
| charges.origin\_account\_description | Este campo se devuelve dependiendo delmétodoo de pago |
| invoice\_lines.surcharge | Este campo se devuelve si la linea de factura tiene recargo |

```
Respuesta:Mostrar + {...}
```

### /invoice/:id

#### get

```

curl --request GET \
  --url https://api.cuentica.com/invoice/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/invoice/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice/:id",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/invoice/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice/:id');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice/:id"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener la factura que corresponde con el id pasado como parámetro.

- **Detalle de la respuesta:**

| Nombre | Descripción |
| --- | --- |
| business.business\_name | Este campo solo se devuelve si el tipo de la empresa **no** es `individual` |
| business.name | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| business.surname\_1 | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| business.surname\_2 | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| charges.origin\_account\_number | Este campo se devuelve dependiendo delmétodoo de pago |
| charges.origin\_account\_description | Este campo se devuelve dependiendo delmétodoo de pago |
| invoice\_lines.surcharge | Este campo se devuelve si la linea de factura tiene recargo |

```
Respuesta:Mostrar + {...}
```

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/invoice/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/invoice/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice/:id",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/invoice/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice/:id');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice/:id"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar una factura.
- **Descripción:** Adicionalmente a los campos de `invoice_lines` y de `charges` detallados en el link de la tabla se añade un nuevo campo opcional `id`

Comportamiento esperado de lineas y cobros en la actualización de facturas.

\\* Si contiene el campo `id` se actualizarán los datos de esa linea o cobro.

\\* Si no contiene el campo `id` se creará una nueva linea o cobro.

\\* Todos los id’s de lineas y cobros que no estén presentes en el objeto que se recibe como parámetro serán eliminados.


- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`issued`** boolean | Este parámetro define si es un borrador o una factura emitida. |
| **`customer`** integer | `Id` del cliente al que se emite la factura. |
| **`invoice_lines`** array | [Lineas de factura](https://apidocs.cuentica.com/versions/latest_release/#linea-de-factura) |
| **`charges`** array | [Cobros](https://apidocs.cuentica.com/versions/latest_release/#cobro-de-factura)<br>**Detalle:**<br>La suma de los cobros debe ser igual que el total de la factura. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`description`** string |  |
| **`annotations`** string |  |
| **`date`** string | Fecha de facturación<br>Formato: yyyy-MM-dd<br>Debe ser superior o igual a la fecha de la ultima factura emitida ese año con la misma serie, si no se envía fecha se usará la fecha de la petición. |
| **`serie`** string | Nombre de la serie de facturación, si no se envía se creará en la serie de facturación por defecto. Si la serie de la factura es IVA-OSS deberá ser un cliente de un país de la UE y no español.‘ |
| **`tags`** array | Las etiquetas que quieres que se asignen a la factura.<br>Si no existen se crearán. |
| **`number`** integer | Número de factura<br>Si es la primera factura del año y de la serie se cogerá este como el primer numero de factura.<br>Si ya existe una factura con la misma serie y se envía este parametro la petición fallará si no es el que le correspondería. |
| **`footer`** string | Pie de factura por defecto del usuario, que configuró en su panel de administración. |
| **`irm`** string | Campo IRM por defecto del usuario para las facturas, que configuró en su panel de administración. |

- **Detalle de la respuesta:**

| Nombre | Descripción |
| --- | --- |
| business.business\_name | Este campo solo se devuelve si el tipo de la empresa **no** es `individual` |
| business.name | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| business.surname\_1 | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| business.surname\_2 | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| charges.origin\_account\_number | Este campo se devuelve dependiendo delmétodoo de pago |
| charges.origin\_account\_description | Este campo se devuelve dependiendo delmétodoo de pago |
| invoice\_lines.surcharge | Este campo se devuelve si la linea de factura tiene recargo |

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/invoice/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/invoice/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice/:id",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/invoice/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice/:id');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice/:id"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar una factura.

- Respuesta: Status 200


### /invoice/:id/public

#### get

```

curl --request GET \
  --url https://api.cuentica.com/invoice/:id/public

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice/:id/public")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/invoice/:id/public")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice/:id/public",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/invoice/:id/public")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice/:id/public');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice/:id/public"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener link de factura pública.

- Respuesta: Link de la vista previa de la factura, tendrá el boton de pago a la cuenta de Stripe que tengas configurada en Cuéntica.


### /invoice/:id/charges

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/invoice/:id/charges

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice/:id/charges")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/invoice/:id/charges")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice/:id/charges",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/invoice/:id/charges")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice/:id/charges');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice/:id/charges"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar los cobros de una factura.
- **Descripción:** Adicionalmente al campo de `charges` detallados en el link de la tabla se añade un nuevo campo opcional `id`

El comportamiento esperado.

\\* Si contiene el campo `id` se actualizarán los datos de ese cobro, en caso de que no exista un cobro con ese id se creará.

\\* Si no contiene el campo `id` se creará un nuevo cobro.

\\* Todos los cobros que existiesen antes pero que no se reciban como parámetro, serán eliminados.


- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`charges`** array | [Cobros](https://apidocs.cuentica.com/versions/latest_release/#cobro-de-factura)<br>**Detalle:**<br>Listado de cobros que quieres actualizar. |

- **Detalle de la respuesta:**

| Nombre | Descripción |
| --- | --- |
| business.business\_name | Este campo solo se devuelve si el tipo de la empresa **no** es `individual` |
| business.name | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| business.surname\_1 | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| business.surname\_2 | Este campo solo se devuelve cuando el tipo de la empresa es `individual` |
| charges.origin\_account\_number | Este campo se devuelve dependiendo delmétodoo de pago |
| charges.origin\_account\_description | Este campo se devuelve dependiendo delmétodoo de pago |
| invoice\_lines.surcharge | Este campo se devuelve si la linea de factura tiene recargo |

```
Respuesta:Mostrar + {...}
```

### /invoice/:id/email

#### post

```

curl --request POST \
  --url https://api.cuentica.com/invoice/:id/email

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice/:id/email")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("POST", "/invoice/:id/email")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice/:id/email",
  "method": "POST",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.post("https://api.cuentica.com/invoice/:id/email")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice/:id/email');
$request->setMethod(HTTP_METH_POST);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice/:id/email"

    req, _ := http.NewRequest("POST", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Enviar un email con la factura.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`to`** array | Destinatarios del correo. |
| **`reply_to`** string | Dirección a la que queremos que contesten. |
| **`subject`** string | Asunto del correo. |
| **`body`** string | Cuerpo del correo. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`cc`** array | Con copia. |
| **`cc_me`** boolean | Enviarme copia del correo. |
| **`show_card_payment`** boolean | Mostrar botón de pago en el email, este botón irá a la vista pública de la factura. |
| **`include_pdf`** boolean | Incluir PDF de la factura en el correo. |
| **`attachments`** array | [Archivos adjuntos](https://apidocs.cuentica.com/versions/latest_release/#adjunto)<br>**Detalle:**<br>Como máximo pueden adjuntarse 5 archivos. |

- Respuesta: Status 200

### /invoice/:id/pdf

#### get

```

curl --request GET \
  --url https://api.cuentica.com/invoice/:id/pdf

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/invoice/:id/pdf")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/invoice/:id/pdf")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/invoice/:id/pdf",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/invoice/:id/pdf")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/invoice/:id/pdf');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/invoice/:id/pdf"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Descargar el archivo PDF de una factura, con el template que tiene la empresa en su configuración.

- Respuesta: Binario Base64


## Ingreso

### /income

#### get

```

curl --request GET \
  --url https://api.cuentica.com/income

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/income")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/income")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener lista de ingresos.

- **Parámetros opcionales en la URL:**

| Nombre | Descripción |
| --- | --- |
| page\_size | Número de elementos que quieren obtenerse por página. |
| page | Página que se quiere obtener. |
| customer | Id del cliente. |
| min\_total\_limit | Los elementos del listado tendrán un total superior a esta cantidad. |
| max\_total\_limit | Los elementos tendrán un total inferior a esta cantidad. |
| initial\_date | Los elementos tendrán una fecha superior a esta.<br>Con formato yyyy-MM-dd. |
| end\_date | Los elementos tendrán una fecha inferior a esta.<br>Con formato yyyy-MM-dd. |
| sort | Es una lista con los valores por los que se quiere ordenar, con el formato:<br>sort=key:order,key:order,key:order<br>Las `key` válidas son:<br> \\* customer -> Ordenar alfabéticamente por cliente.<br> \\* document\_number -> Ordenar alfabéticamente por nº de documento.<br> \\* total\_base-> Ordenar por total de la base del ingreso.<br> \\* total\_income -> Ordenar por total de ingreso.<br> \\* date -> Ordenar por fecha.<br>Los `order` válidos son:<br> \\* desc -> Mayor a menor.<br> \\* asc -> Menor a mayor. |
| tags | Lista de tags por los que se quiere buscar:<br>tag\_1,tag\_2<br>Se devolverán lso resultados que contengan Todos los tags |

```
Respuesta:Mostrar + [ ... ]
```

#### post

```

curl --request POST \
  --url https://api.cuentica.com/income \
  --data '{"customer":0,"date":"<ADD STRING VALUE>","tags":["<ADD STRING VALUE>"],"document_type":"other_invoice","document_number":"<ADD STRING VALUE>","annotations":"<ADD STRING VALUE>","income_lines":[{"concept":"<ADD STRING VALUE>","amount":0,"tax":0,"retention":0,"imputation":0,"income_type":"<ADD STRING VALUE>","tax_regime":"01","tax_subjection_code":"S1"}],"charges":[{"date":"<ADD STRING VALUE>","amount":0,"payment_method":"cash","origin_account":"<ADD STRING VALUE>","destination_account":0,"paid":false}]}'

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request.body = "{\"customer\":0,\"date\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"document_type\":\"other_invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"income_lines\":[{\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"tax\":0,\"retention\":0,\"imputation\":0,\"income_type\":\"<ADD STRING VALUE>\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}"

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

payload = "{\"customer\":0,\"date\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"document_type\":\"other_invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"income_lines\":[{\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"tax\":0,\"retention\":0,\"imputation\":0,\"income_type\":\"<ADD STRING VALUE>\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}"

conn.request("POST", "/income", payload)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income",
  "method": "POST",
  "headers": {},
  "processData": false,
  "data": "{\"customer\":0,\"date\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"document_type\":\"other_invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"income_lines\":[{\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"tax\":0,\"retention\":0,\"imputation\":0,\"income_type\":\"<ADD STRING VALUE>\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.post("https://api.cuentica.com/income")
  .body("{\"customer\":0,\"date\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"document_type\":\"other_invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"income_lines\":[{\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"tax\":0,\"retention\":0,\"imputation\":0,\"income_type\":\"<ADD STRING VALUE>\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income');
$request->setMethod(HTTP_METH_POST);

$request->setBody('{"customer":0,"date":"<ADD STRING VALUE>","tags":["<ADD STRING VALUE>"],"document_type":"other_invoice","document_number":"<ADD STRING VALUE>","annotations":"<ADD STRING VALUE>","income_lines":[{"concept":"<ADD STRING VALUE>","amount":0,"tax":0,"retention":0,"imputation":0,"income_type":"<ADD STRING VALUE>","tax_regime":"01","tax_subjection_code":"S1"}],"charges":[{"date":"<ADD STRING VALUE>","amount":0,"payment_method":"cash","origin_account":"<ADD STRING VALUE>","destination_account":0,"paid":false}]}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "strings"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income"

    payload := strings.NewReader("{\"customer\":0,\"date\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"document_type\":\"other_invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"annotations\":\"<ADD STRING VALUE>\",\"income_lines\":[{\"concept\":\"<ADD STRING VALUE>\",\"amount\":0,\"tax\":0,\"retention\":0,\"imputation\":0,\"income_type\":\"<ADD STRING VALUE>\",\"tax_regime\":\"01\",\"tax_subjection_code\":\"S1\"}],\"charges\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"paid\":false}]}")

    req, _ := http.NewRequest("POST", url, payload)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Añadir un nuevo ingreso.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`customer`** integer | `Id` del cliente al que se cobra el ingreso. |
| **`income_lines`** array | [Lineas de ingreso](https://apidocs.cuentica.com/versions/latest_release/#linea-de-ingreso) |
| **`charges`** array | [Cobros](https://apidocs.cuentica.com/versions/latest_release/#cobro-de-factura)<br>**Detalle:**<br>La suma de los cobros debe ser igual que el total del ingreso. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`date`** string | Fecha del ingreso.<br>Formato: yyyy-MM-dd<br>Si no se envía fecha se usará la fecha de la petición. |
| **`tags`** array | Las etiquetas que quieres que se asignen al ingreso.<br>Si no existen se crearán. |
| **`document_type`** string | **Valores aceptados:**<br>other\_invoice, cash\_statement, interest\_settlement, bank\_doc, contract, resolution, other\_doc<br>**Detalle:**<br>Tipo de ingreso que se va a guardar.. |
| **`document_number`** string | Número de ingreso. |
| **`annotations`** string | Comentario personal sobre el ingreso |
| **`attachment`** object | [Archivo adjunto](https://apidocs.cuentica.com/versions/latest_release/#adjunto) |

```
Respuesta:Mostrar + {...}
```

### /income/:id

#### get

```

curl --request GET \
  --url https://api.cuentica.com/income/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/income/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income/:id",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/income/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income/:id');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income/:id"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el ingreso que corresponde con el id pasado como parámetro.

```
Respuesta:Mostrar + {...}
```

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/income/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/income/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income/:id",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/income/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income/:id');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income/:id"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar un ingreso.
- **Descripción:** Adicionalmente a los campos de `income_lines` y de `charges` detallados en el link de la tabla se añade un nuevo campo opcional `id`

Comportamiento esperado de lineas y cobros en la actualización de ingresos.

\\* Si contiene el campo `id` se actualizarán los datos de esa linea o cobro.

\\* Si no contiene el campo `id` se creará una nueva linea o cobro.

\\* Todos los id’s de lineas y cobros que no estén presentes en el objeto que se recibe como parámetro serán eliminados.


- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`customer`** integer | `Id` del cliente al que se cobra el ingreso. |
| **`income_lines`** array | [Lineas de ingreso](https://apidocs.cuentica.com/versions/latest_release/#linea-de-ingreso) |
| **`charges`** array | [Cobros](https://apidocs.cuentica.com/versions/latest_release/#cobro-de-factura)<br>**Detalle:**<br>La suma de los cobros debe ser igual que el total del ingreso. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`date`** string | Fecha del ingreso.<br>Formato: yyyy-MM-dd<br>Si no se envía fecha se usará la fecha de la petición. |
| **`tags`** array | Las etiquetas que quieres que se asignen al ingreso.<br>Si no existen se crearán. |
| **`document_type`** string | **Valores aceptados:**<br>other\_invoice, cash\_statement, interest\_settlement, bank\_doc, contract, resolution, other\_doc<br>**Detalle:**<br>Tipo de ingreso que se va a guardar.. |
| **`document_number`** string | Número de ingreso. |
| **`annotations`** string | Comentario personal sobre el ingreso |
| **`attachment`** object | [Archivo adjunto](https://apidocs.cuentica.com/versions/latest_release/#adjunto) |

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/income/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/income/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income/:id",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/income/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income/:id');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income/:id"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar un ingreso.

- Respuesta: Status 200


### /income/:id/attachment

#### get

```

curl --request GET \
  --url https://api.cuentica.com/income/:id/attachment

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income/:id/attachment")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/income/:id/attachment")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income/:id/attachment",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/income/:id/attachment")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income/:id/attachment');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income/:id/attachment"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el adjunto de un Ingreso en Base64

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/income/:id/attachment

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income/:id/attachment")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/income/:id/attachment")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income/:id/attachment",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/income/:id/attachment")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income/:id/attachment');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income/:id/attachment"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar el adjunto de un ingreso.

- Respuesta: Status 200


#### put

```

curl --request PUT \
  --url https://api.cuentica.com/income/:id/attachment

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income/:id/attachment")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/income/:id/attachment")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income/:id/attachment",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/income/:id/attachment")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income/:id/attachment');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income/:id/attachment"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar el adjunto de un ingreso.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`filename`** string | Nombre del archivo que tendrá cuando se envíe. |
| **`data`** string | El fichero en Base64. |

```
Respuesta:Mostrar + {...}
```

### /income/:id/charges

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/income/:id/charges

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/income/:id/charges")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/income/:id/charges")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/income/:id/charges",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/income/:id/charges")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/income/:id/charges');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/income/:id/charges"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar los cobros de un ingreso.
- **Descripción:** Adicionalmente al campo de `charges` detallados en el link de la tabla se añade un nuevo campo opcional `id`

El comportamiento esperado.

\\* Si contiene el campo `id` se actualizarán los datos de ese cobro, en caso de que no exista un cobro con ese id se creará.

\\* Si no contiene el campo `id` se creará un nuevo cobro.

\\* Todos los cobros que existiesen antes pero que no se reciban como parámetro, serán eliminados.


- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`charges`** array | [Cobros](https://apidocs.cuentica.com/versions/latest_release/#cobro-de-factura)<br>**Detalle:**<br>Listado de cobros que quieres actualizar. |

```
Respuesta:Mostrar + {...}
```

## Gasto

### /expense

#### get

```

curl --request GET \
  --url https://api.cuentica.com/expense

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/expense")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/expense")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener lista de gastos.

- **Parámetros opcionales en la URL:**

| Nombre | Descripción |
| --- | --- |
| page\_size | Número de elementos que quieren obtenerse por página. |
| page | Página que se quiere obtener. |
| provider | Id del proveedor. |
| min\_total\_limit | Los elementos del listado tendrán un total superior a esta cantidad. |
| max\_total\_limit | Los elementos tendrán un total inferior a esta cantidad. |
| initial\_date | Los elementos tendrán una fecha superior a esta.<br>Con formato yyyy-MM-dd. |
| end\_date | Los elementos tendrán una fecha inferior a esta.<br>Con formato yyyy-MM-dd. |
| expense\_type | Devolverá los gastos con este tipo de gasto. |
| investment\_type | Devolverá los gastos con este tipo de inversión. |
| draft | `true` -\> Mostrar borradores<br>`false` -\> Mostrar gastos confirmados |
| sort | Es una lista con los valores por los que se quiere ordenar, con el formato:<br>sort=key:order,key:order,key:order<br>Las `key` válidas son:<br> \\* provider -> Ordenar alfabéticamente cliente.<br> \\* document\_number -> Ordenar alfabéticamente por nº de documento.<br> \\* total\_base -> Ordenar por total de la base del gasto.<br> \\* total\_expense -> Ordenar por total del gasto.<br> \\* date -> Ordenar por fecha.<br>Los `order` válidos son:<br> \\* desc -> Mayor a menor.<br> \\* asc -> Menor a mayor. |
| tags | Lista de tags por los que se quiere buscar:<br>tag\_1,tag\_2<br>Se devolverán lso resultados que contengan Todos los tags |

```
Respuesta:Mostrar + [ ... ]
```

#### post

```

curl --request POST \
  --url https://api.cuentica.com/expense \
  --data '{"date":"<ADD STRING VALUE>","draft":false,"provider":0,"document_type":"invoice","document_number":"<ADD STRING VALUE>","tags":["<ADD STRING VALUE>"],"annotations":"<ADD STRING VALUE>","expense_lines":[{"description":"<ADD STRING VALUE>","base":0,"tax":0,"surcharge":0,"retention":0,"imputation":0,"expense_type":"<ADD STRING VALUE>","investment":false}],"payments":[{"date":"<ADD STRING VALUE>","amount":0,"payment_method":"cash","origin_account":0,"destination_account":"<ADD STRING VALUE>","paid":false}]}'

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request.body = "{\"date\":\"<ADD STRING VALUE>\",\"draft\":false,\"provider\":0,\"document_type\":\"invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"annotations\":\"<ADD STRING VALUE>\",\"expense_lines\":[{\"description\":\"<ADD STRING VALUE>\",\"base\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"imputation\":0,\"expense_type\":\"<ADD STRING VALUE>\",\"investment\":false}],\"payments\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":0,\"destination_account\":\"<ADD STRING VALUE>\",\"paid\":false}]}"

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

payload = "{\"date\":\"<ADD STRING VALUE>\",\"draft\":false,\"provider\":0,\"document_type\":\"invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"annotations\":\"<ADD STRING VALUE>\",\"expense_lines\":[{\"description\":\"<ADD STRING VALUE>\",\"base\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"imputation\":0,\"expense_type\":\"<ADD STRING VALUE>\",\"investment\":false}],\"payments\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":0,\"destination_account\":\"<ADD STRING VALUE>\",\"paid\":false}]}"

conn.request("POST", "/expense", payload)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense",
  "method": "POST",
  "headers": {},
  "processData": false,
  "data": "{\"date\":\"<ADD STRING VALUE>\",\"draft\":false,\"provider\":0,\"document_type\":\"invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"annotations\":\"<ADD STRING VALUE>\",\"expense_lines\":[{\"description\":\"<ADD STRING VALUE>\",\"base\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"imputation\":0,\"expense_type\":\"<ADD STRING VALUE>\",\"investment\":false}],\"payments\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":0,\"destination_account\":\"<ADD STRING VALUE>\",\"paid\":false}]}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.post("https://api.cuentica.com/expense")
  .body("{\"date\":\"<ADD STRING VALUE>\",\"draft\":false,\"provider\":0,\"document_type\":\"invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"annotations\":\"<ADD STRING VALUE>\",\"expense_lines\":[{\"description\":\"<ADD STRING VALUE>\",\"base\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"imputation\":0,\"expense_type\":\"<ADD STRING VALUE>\",\"investment\":false}],\"payments\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":0,\"destination_account\":\"<ADD STRING VALUE>\",\"paid\":false}]}")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense');
$request->setMethod(HTTP_METH_POST);

$request->setBody('{"date":"<ADD STRING VALUE>","draft":false,"provider":0,"document_type":"invoice","document_number":"<ADD STRING VALUE>","tags":["<ADD STRING VALUE>"],"annotations":"<ADD STRING VALUE>","expense_lines":[{"description":"<ADD STRING VALUE>","base":0,"tax":0,"surcharge":0,"retention":0,"imputation":0,"expense_type":"<ADD STRING VALUE>","investment":false}],"payments":[{"date":"<ADD STRING VALUE>","amount":0,"payment_method":"cash","origin_account":0,"destination_account":"<ADD STRING VALUE>","paid":false}]}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "strings"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense"

    payload := strings.NewReader("{\"date\":\"<ADD STRING VALUE>\",\"draft\":false,\"provider\":0,\"document_type\":\"invoice\",\"document_number\":\"<ADD STRING VALUE>\",\"tags\":[\"<ADD STRING VALUE>\"],\"annotations\":\"<ADD STRING VALUE>\",\"expense_lines\":[{\"description\":\"<ADD STRING VALUE>\",\"base\":0,\"tax\":0,\"surcharge\":0,\"retention\":0,\"imputation\":0,\"expense_type\":\"<ADD STRING VALUE>\",\"investment\":false}],\"payments\":[{\"date\":\"<ADD STRING VALUE>\",\"amount\":0,\"payment_method\":\"cash\",\"origin_account\":0,\"destination_account\":\"<ADD STRING VALUE>\",\"paid\":false}]}")

    req, _ := http.NewRequest("POST", url, payload)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Añadir un nuevo gasto.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`date`** string | Con formato -> yyyy-MM-dd |
| **`draft`** boolean |  |
| **`provider`** integer |  |
| **`document_type`** string | **Valores aceptados:**<br>invoice, ticket<br>**Detalle:**<br>Los documentos pueden ser facturas o ticket. |
| **`expense_lines`** array | [Lineas de gasto](https://apidocs.cuentica.com/versions/latest_release/#linea-de-gasto) |
| **`payments`** array | [Pagos](https://apidocs.cuentica.com/versions/latest_release/#pago-de-gasto) |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`document_number`** string |  |
| **`tags`** array | Las etiquetas que quieres que se asignen al gasto.<br>Si no existen se crearán. |
| **`annotations`** string |  |
| **`attachment`** object | [Archivo adjunto](https://apidocs.cuentica.com/versions/latest_release/#adjunto) |

```
Respuesta:Mostrar + {...}
```

### /expense/:id

#### get

```

curl --request GET \
  --url https://api.cuentica.com/expense/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/expense/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense/:id",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/expense/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense/:id');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense/:id"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el gasto que corresponde con el id pasado como parámetro.

```
Respuesta:Mostrar + {...}
```

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/expense/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/expense/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense/:id",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/expense/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense/:id');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense/:id"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar un gasto.
- **Descripción:** Adicionalmente a los campos de `expense_lines` y de `payments` detallados en el link de la tabla de añade un nuevo campo opcional `id`

Comportamiento esperado de lineas y pagos en la actualización de facturas.

\\* Si contiene el campo `id` se actualizarán los datos de esa linea o cobro.

\\* Si no contiene el campo `id` se creará una nueva linea o cobro.

\\* Todos los id’s de lineas y pagos que no estén presentes en el objeto que se recibe como parámetro serán eliminados.


- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`date`** string | Con formato -> yyyy-MM-dd |
| **`draft`** boolean |  |
| **`provider`** integer |  |
| **`document_type`** string | **Valores aceptados:**<br>invoice, ticket<br>**Detalle:**<br>Los documentos pueden ser facturas o ticket. |
| **`expense_lines`** array | [Lineas de gasto](https://apidocs.cuentica.com/versions/latest_release/#linea-de-gasto) |
| **`payments`** array | [Pagos](https://apidocs.cuentica.com/versions/latest_release/#pago-de-gasto) |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`document_number`** string |  |
| **`tags`** array | Las etiquetas que quieres que se asignen al gasto.<br>Si no existen se crearán. |
| **`annotations`** string |  |
| **`attachment`** object | [Archivo adjunto](https://apidocs.cuentica.com/versions/latest_release/#adjunto) |

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/expense/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/expense/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense/:id",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/expense/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense/:id');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense/:id"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar un gasto

- Respuesta: Status 200


### /expense/:id/attachment

#### get

```

curl --request GET \
  --url https://api.cuentica.com/expense/:id/attachment

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense/:id/attachment")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/expense/:id/attachment")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense/:id/attachment",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/expense/:id/attachment")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense/:id/attachment');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense/:id/attachment"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el adjunto de un gasto en Base64

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/expense/:id/attachment

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense/:id/attachment")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/expense/:id/attachment")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense/:id/attachment",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/expense/:id/attachment")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense/:id/attachment');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense/:id/attachment"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar el adjunto de un gasto.

- Respuesta: Status 200


#### put

```

curl --request PUT \
  --url https://api.cuentica.com/expense/:id/attachment

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense/:id/attachment")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/expense/:id/attachment")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense/:id/attachment",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/expense/:id/attachment")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense/:id/attachment');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense/:id/attachment"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar el adjunto de un gasto.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`filename`** string | Nombre del archivo que tendrá cuando se envíe. |
| **`data`** string | El fichero en Base64. |

```
Respuesta:Mostrar + {...}
```

### /expense/:id/payments

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/expense/:id/payments

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/expense/:id/payments")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/expense/:id/payments")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/expense/:id/payments",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/expense/:id/payments")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/expense/:id/payments');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/expense/:id/payments"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar los pagos de un gasto.
- **Descripción:** Adicionalmente al campo de `payments` detallados en el link de la tabla se añade un nuevo campo opcional `id`

El comportamiento esperado.

\\* Si contiene el campo `id` se actualizarán los datos de ese pago, en caso de que no exista un pago con ese id se creará.

\\* Si no contiene el campo `id` se creará un nuevo pago.

\\* Todos los pagos que existiesen antes pero que no se reciban como parámetro, serán eliminados.


- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`payments`** array | [Pagos](https://apidocs.cuentica.com/versions/latest_release/#pago-de-gasto)<br>**Detalle:**<br>Listado de pagos que quieres actualizar. |

```
Respuesta:Mostrar + {...}
```

## Documento

### /document

#### get

```

curl --request GET \
  --url https://api.cuentica.com/document

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/document")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/document")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/document",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/document")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/document');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/document"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener lista de documentos.

- **Parámetros opcionales en la URL:**

| Nombre | Descripción |
| --- | --- |
| page\_size | Número de elementos que quieren obtenerse por página. |
| page | Página que se quiere obtener. |
| sort | \\* `desc` -\> Mayor a menor.<br>\\* `asc` -\> Menor a mayor. |
| initial\_date | Los elementos tendrán una fecha superior a esta.<br>Con formato yyyy-MM-dd. |
| end\_date | Los elementos tendrán una fecha inferior a esta.<br>Con formato yyyy-MM-dd. |
| keyword | texto a buscar en el nombre o asunto |
| assigned | \\* `true` -\> Mostrar procesados<br>\\* `false` -\> Mostrar pendientes |
| extension | Lista de extensiones por las que se quiere buscar. <br>Se puede indicar “!” para excluir de los resultados.<br>`!pdf,jpg,jpeg` |
| hash | hash del fichero en algoritmo MD5 |

```
Respuesta:Mostrar + [ ... ]
```

#### post

```

curl --request POST \
  --url https://api.cuentica.com/document \
  --data '{"date":"<ADD STRING VALUE>","expense_id":0}'

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/document")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request.body = "{\"date\":\"<ADD STRING VALUE>\",\"expense_id\":0}"

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

payload = "{\"date\":\"<ADD STRING VALUE>\",\"expense_id\":0}"

conn.request("POST", "/document", payload)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/document",
  "method": "POST",
  "headers": {},
  "processData": false,
  "data": "{\"date\":\"<ADD STRING VALUE>\",\"expense_id\":0}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.post("https://api.cuentica.com/document")
  .body("{\"date\":\"<ADD STRING VALUE>\",\"expense_id\":0}")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/document');
$request->setMethod(HTTP_METH_POST);

$request->setBody('{"date":"<ADD STRING VALUE>","expense_id":0}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "strings"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/document"

    payload := strings.NewReader("{\"date\":\"<ADD STRING VALUE>\",\"expense_id\":0}")

    req, _ := http.NewRequest("POST", url, payload)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Añadir un nuevo documento.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`attachment`** object | [Archivo adjunto](https://apidocs.cuentica.com/versions/latest_release/#adjunto) |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`date`** string | Con formato -> yyyy-MM-dd |
| **`expense_id`** integer | id del gasto asociado al documento |

```
Respuesta:Mostrar + {...}
```

### /document/:id

#### get

```

curl --request GET \
  --url https://api.cuentica.com/document/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/document/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/document/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/document/:id",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/document/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/document/:id');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/document/:id"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el documento que corresponde con el id pasado como parámetro.

```
Respuesta:Mostrar + {...}
```

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/document/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/document/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/document/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/document/:id",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/document/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/document/:id');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/document/:id"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar un documento.
- **Descripción:** Solo se permite cambiar

\\* `expense_id`: gasto asignado

\\* `date`: fecha del documento


- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`attachment`** object | [Archivo adjunto](https://apidocs.cuentica.com/versions/latest_release/#adjunto) |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`date`** string | Con formato -> yyyy-MM-dd |
| **`expense_id`** integer | id del gasto asociado al documento |

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/document/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/document/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/document/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/document/:id",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/document/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/document/:id');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/document/:id"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar un documento

- Respuesta: Status 200


### /document/:id/attachment

#### get

```

curl --request GET \
  --url https://api.cuentica.com/document/:id/attachment

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/document/:id/attachment")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/document/:id/attachment")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/document/:id/attachment",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/document/:id/attachment")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/document/:id/attachment');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/document/:id/attachment"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el adjunto de un documento en Base64

```
Respuesta:Mostrar + {...}
```

## Etiqueta

### /tag

#### get

```

curl --request GET \
  --url https://api.cuentica.com/tag

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/tag")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/tag")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/tag",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/tag")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/tag');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/tag"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener lista de tags.

```
Respuesta:Mostrar + [ ... ]
```

## Traspaso

### /transfer

#### get

```

curl --request GET \
  --url 'https://api.cuentica.com/transfer?origin_account=SOME_INTEGER_VALUE&destination_account=SOME_INTEGER_VALUE&payment_method=SOME_STRING_VALUE&sort=SOME_STRING_VALUE'

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/transfer?origin_account=SOME_INTEGER_VALUE&destination_account=SOME_INTEGER_VALUE&payment_method=SOME_STRING_VALUE&sort=SOME_STRING_VALUE")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/transfer?origin_account=SOME_INTEGER_VALUE&destination_account=SOME_INTEGER_VALUE&payment_method=SOME_STRING_VALUE&sort=SOME_STRING_VALUE")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/transfer?origin_account=SOME_INTEGER_VALUE&destination_account=SOME_INTEGER_VALUE&payment_method=SOME_STRING_VALUE&sort=SOME_STRING_VALUE",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/transfer?origin_account=SOME_INTEGER_VALUE&destination_account=SOME_INTEGER_VALUE&payment_method=SOME_STRING_VALUE&sort=SOME_STRING_VALUE")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/transfer');
$request->setMethod(HTTP_METH_GET);

$request->setQueryData(array(
  'origin_account' => 'SOME_INTEGER_VALUE',
  'destination_account' => 'SOME_INTEGER_VALUE',
  'payment_method' => 'SOME_STRING_VALUE',
  'sort' => 'SOME_STRING_VALUE'
));

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/transfer?origin_account=SOME_INTEGER_VALUE&destination_account=SOME_INTEGER_VALUE&payment_method=SOME_STRING_VALUE&sort=SOME_STRING_VALUE"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener listado de traspasos.

- **Parámetros opcionales en la URL:**

| Nombre | Descripción |
| --- | --- |
| origin\_account | Id de la cuenta de origen que queremos filtrar. |
| destination\_account | Id de la cuenta de destino que queremos filtrar. |
| payment\_method | Este es el método por el cual se ha hecho el traspaso. |
| sort | El tipo de orden que queremos para ordenar por fecha, ascendente odescendente.<br>sort=asc<br>Los `valores` válidos son:<br> \\* desc -> Mayor a menor.<br> \\* asc -> Menor a mayor. |
| page\_size | Número de elementos que quieren obtenerse por página. |
| page | Página que se quiere obtener. |
| min\_total\_limit | Los elementos del listado tendrán un total superior a esta cantidad. |
| max\_total\_limit | Los elementos tendrán un total inferior a esta cantidad. |
| initial\_date | Los elementos tendrán una fecha superior a esta.<br>Con formato yyyy-MM-dd. |
| end\_date | Los elementos tendrán una fecha inferior a esta.<br>Con formato yyyy-MM-dd. |

```
Respuesta:Mostrar + [ ... ]
```

#### post

```

curl --request POST \
  --url https://api.cuentica.com/transfer \
  --data '{"amount":0,"payment_method":"cash","date":"<ADD STRING VALUE>","concept":"<ADD STRING VALUE>","destination_account":0,"origin_account":0}'

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/transfer")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request.body = "{\"amount\":0,\"payment_method\":\"cash\",\"date\":\"<ADD STRING VALUE>\",\"concept\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"origin_account\":0}"

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

payload = "{\"amount\":0,\"payment_method\":\"cash\",\"date\":\"<ADD STRING VALUE>\",\"concept\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"origin_account\":0}"

conn.request("POST", "/transfer", payload)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/transfer",
  "method": "POST",
  "headers": {},
  "processData": false,
  "data": "{\"amount\":0,\"payment_method\":\"cash\",\"date\":\"<ADD STRING VALUE>\",\"concept\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"origin_account\":0}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.post("https://api.cuentica.com/transfer")
  .body("{\"amount\":0,\"payment_method\":\"cash\",\"date\":\"<ADD STRING VALUE>\",\"concept\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"origin_account\":0}")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/transfer');
$request->setMethod(HTTP_METH_POST);

$request->setBody('{"amount":0,"payment_method":"cash","date":"<ADD STRING VALUE>","concept":"<ADD STRING VALUE>","destination_account":0,"origin_account":0}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "strings"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/transfer"

    payload := strings.NewReader("{\"amount\":0,\"payment_method\":\"cash\",\"date\":\"<ADD STRING VALUE>\",\"concept\":\"<ADD STRING VALUE>\",\"destination_account\":0,\"origin_account\":0}")

    req, _ := http.NewRequest("POST", url, payload)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Crear traspaso.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`amount`** number |  |
| **`concept`** string | No puede ser un texto vacío. |
| **`destination_account`** integer | id de la cuenta de destino del traspaso. |
| **`origin_account`** integer | id de la cuenta de origen del traspaso. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`payment_method`** string | **Valores aceptados:**<br>cash, wire\_transfer, promissory\_note<br>**Detalle:**<br>Este es el método por el cual se ha hecho el traspaso. |
| **`date`** string | Fecha del traspaso<br>Formato: yyyy-MM-dd |

```
Respuesta:Mostrar + {...}
```

### /transfer/:id

#### get

```

curl --request GET \
  --url https://api.cuentica.com/transfer/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/transfer/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("GET", "/transfer/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/transfer/:id",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.get("https://api.cuentica.com/transfer/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/transfer/:id');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/transfer/:id"

    req, _ := http.NewRequest("GET", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Obtener el traspaso por id.

```
Respuesta:Mostrar + {...}
```

#### put

```

curl --request PUT \
  --url https://api.cuentica.com/transfer/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/transfer/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("PUT", "/transfer/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/transfer/:id",
  "method": "PUT",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.put("https://api.cuentica.com/transfer/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/transfer/:id');
$request->setMethod(HTTP_METH_PUT);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/transfer/:id"

    req, _ := http.NewRequest("PUT", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Actualizar traspaso.

- **Parametros obligatorios en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`amount`** number |  |
| **`concept`** string | No puede ser un texto vacío. |
| **`destination_account`** integer | id de la cuenta de destino del traspaso. |
| **`origin_account`** integer | id de la cuenta de origen del traspaso. |

- **Parametros opcionales en la petición:**

| Nombre | Descripción |
| --- | --- |
| **`payment_method`** string | **Valores aceptados:**<br>cash, wire\_transfer, promissory\_note<br>**Detalle:**<br>Este es el método por el cual se ha hecho el traspaso. |
| **`date`** string | Fecha del traspaso<br>Formato: yyyy-MM-dd |

```
Respuesta:Mostrar + {...}
```

#### delete

```

curl --request DELETE \
  --url https://api.cuentica.com/transfer/:id

```

```

require 'uri'
require 'net/http'

url = URI("https://api.cuentica.com/transfer/:id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body

```

```

import http.client

conn = http.client.HTTPSConnection("api.cuentica.com")

conn.request("DELETE", "/transfer/:id")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

```

```

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cuentica.com/transfer/:id",
  "method": "DELETE",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```

```

HttpResponse<String> response = Unirest.delete("https://api.cuentica.com/transfer/:id")
  .asString();

```

```

<?php

$request = new HttpRequest();
$request->setUrl('https://api.cuentica.com/transfer/:id');
$request->setMethod(HTTP_METH_DELETE);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}

```

```

package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {

    url := "https://api.cuentica.com/transfer/:id"

    req, _ := http.NewRequest("DELETE", url, nil)

    res, _ := http.DefaultClient.Do(req)

    defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))

}

```

- **Resumen:** Eliminar traspaso.

- Respuesta: Status 200


## Subentidades

### Linea de factura

**Descripción del objeto:** Volver

| Nombre del campo | Descripción | Obligatorio |
| --- | --- | --- |
| **quantity**<br> double |  | true |
| **concept**<br> string | No puede ser un texto vacío. | true |
| **amount**<br> double |  | true |
| **discount**<br> double | No puede ser negativo | true |
| **tax**<br> double | **Valores aceptados:**<br>0.0, 3.0, 4.0, 7.0, 9.5, 10.0, 12.0, 13.5, 20.0, 21.0<br>**Detalle:**<br>IVA: 0.0, 4.0, 10.0, 12.0, 21.0<br>IGIC: 0.0, 3.0, 7.0, 9.5, 13.5, 20.0 | true |
| **surcharge**<br> double | En caso de que el cliente al que se factura tenga activado el recargo de equivalencia y no se adjunte este valor se guardará el valor por defecto.<br>Si el cliente no tiene activado el recargo de equivalencia el parámetro no debe incluirse en la petición. | false |
| **retention**<br> double | No puede ser negativo | true |
| **sell\_type**<br> string | **Valores aceptados:**<br>service, product<br>**Detalle:**<br>Se ha prestado un servicio o se ha vendido un bien. | true |
| **tax\_regime**<br> string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-operaci-n)<br>**Detalle:**<br>Clasificación de tipo de operación.<br> Si por los datos se puede inferir la clave, el campo será opcional y se configurará automáticamente en caso de no enviarse. | true |
| **tax\_subjection\_code**<br> string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-sujeci-n-de-iva)<br>**Detalle:**<br>Clasificación de sujeción/exención de IVA.<br> Si por los datos se puede inferir la clave, el campo será opcional y se configurará automáticamente en caso de no enviarse. | true |

### Linea de ingreso

**Descripción del objeto:** Volver

| Nombre del campo | Descripción | Obligatorio |
| --- | --- | --- |
| **concept**<br> string | No puede ser un texto vacío. | true |
| **amount**<br> double |  | true |
| **tax**<br> double |  | true |
| **retention**<br> double | No puede ser negativo | true |
| **imputation**<br> double | No puede ser negativo | true |
| **income\_type**<br> string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-ingreso)<br>**Detalle:**<br>Si no se envía se usará el tipo de ingreso 759 Otro ingreso | true |
| **tax\_regime**<br> string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-operaci-n)<br>**Detalle:**<br>Clasificación de tipo de operación.<br> Si por los datos se puede inferir la clave, el campo será opcional y se configurará automáticamente en caso de no enviarse. | true |
| **tax\_subjection\_code**<br> string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-sujeci-n-de-iva)<br>**Detalle:**<br>Clasificación de sujeción/exención de IVA.<br> Si por los datos se puede inferir la clave, el campo será opcional y se configurará automáticamente en caso de no enviarse. | true |

### Cobro de factura

**Descripción del objeto:** Volver

| Nombre del campo | Descripción | Obligatorio |
| --- | --- | --- |
| **date**<br> string | Fecha de cobro<br>Con formato -> yyyy-MM-dd | false |
| **amount**<br> double |  | true |
| **payment\_method**<br> string | **Valores aceptados:**<br>cash, receipt, wire\_transfer, card, promissory\_note, other<br>**Detalle:**<br>Método de cobro con el que se realiza este cobro. | true |
| **origin\_account**<br> string | Número de cuenta del cliente a la que se va a cobrar el importe del cobro. | false |
| **destination\_account**<br> long | Id de la cuenta del usuario a la que se va a ingresar el cobro. | true |
| **paid**<br> boolean | El cobro ha sido realizado. | true |

### Linea de gasto

**Descripción del objeto:** Volver

| Nombre del campo | Descripción | Obligatorio |
| --- | --- | --- |
| **description**<br> string |  | true |
| **base**<br> double |  | true |
| **tax**<br> double |  | true |
| **surcharge**<br> double |  | false |
| **retention**<br> double |  | true |
| **imputation**<br> double |  | true |
| **expense\_type**<br> string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-gasto)<br>**Detalle:**<br>Este campo es obligatorio si `investment` es false. | false |
| **investment**<br> boolean |  | false |
| **investment\_data**<br> object | [Datos de la inversion](https://apidocs.cuentica.com/versions/latest_release/#detalles-de-inversion)<br>**Detalle:**<br>Este campo solo es obligatorio el campo `investment` es true. | false |

### Pago de gasto

**Descripción del objeto:** Volver

| Nombre del campo | Descripción | Obligatorio |
| --- | --- | --- |
| **date**<br> string | Con formato -> yyyy-MM-dd | false |
| **amount**<br> double |  | true |
| **payment\_method**<br> string | **Valores aceptados:**<br>cash, receipt, wire\_transfer, card, promissory\_note, other<br>**Detalle:**<br>Método de pago con el que se realiza este gasto. | true |
| **origin\_account**<br> long | Id de la cuenta de la empresa con la que se va a realizar el pago. | true |
| **destination\_account**<br> string | La cuenta del proveedor al que vamos a pagarle. | false |
| **paid**<br> boolean |  | true |

### Detalles de inversion

**Descripción del objeto:** Volver

| Nombre del campo | Descripción | Obligatorio |
| --- | --- | --- |
| **investment\_type**<br> string | [Valores aceptados](https://apidocs.cuentica.com/versions/latest_release/#tipos-de-inversi-n) | true |
| **value**<br> double |  | true |
| **start\_date**<br> string | Con formato -> yyyy-MM-dd | true |
| **end\_date**<br> string | Con formato -> yyyy-MM-dd | true |
| **duration**<br> integer |  | true |
| **used**<br> boolean |  | true |

### Adjunto

**Descripción del objeto:** Volver

| Nombre del campo | Descripción | Obligatorio |
| --- | --- | --- |
| **filename**<br> string | Nombre del archivo que tendrá cuando se envíe. | true |
| **data**<br> string | El fichero en Base64. | true |

## Regiones

Volver

**Listado de regiones aceptadas para España**

Para facilitar un poco este campo, la región se normaliza al procesarse, pasando todo a minusculas y eliminando acentos.

Álava = alava = áLÁVá

A Coruña

Álava

Albacete

Alicante

Almería

Asturias

Ávila

Badajoz

Barcelona

Bizkaia

Burgos

Cáceres

Cádiz

Cantabria

Castellón

Ceuta

Ciudad Real

Córdoba

Cuenca

Girona

Granada

Guadalajara

Gipuzkoa

Huelva

Huesca

Illes Balears

Jaén

La Rioja

Las Palmas

León

Lleida

Lugo

Madrid

Málaga

Melilla

Murcia

Navarra

Ourense

Palencia

Pontevedra

Salamanca

Segovia

Sevilla

Soria

Tarragona

Santa Cruz de Tenerife

Teruel

Toledo

Valencia

Valladolid

Zamora

Zaragoza

## Tipos de gasto

Volver

| Código | Significado |
| --- | --- |
| 600 | Compras de productos para vender |
| 601 | Compras de materias primas |
| 602 | Compras de otros aprovisionamientos |
| 607 | Trabajos realizados otras empresas |
| 6210001 | Alquiler de inmuebles y locales |
| 6210002 | Alquiler de bienes y equipos |
| 6210003 | Otros alquileres |
| 622 | Reparaciones, mantenimiento y limpieza |
| 6230001 | Asesoria fiscal y contable |
| 6230002 | Asesoria Laboral |
| 6230005 | Otros servicios profesionales |
| 624 | Gastos de transporte |
| 625 | Primas de seguro |
| 626 | Comisiones y gastos bancarios |
| 627 | Gastos de publicidad y propaganda |
| 6280003 | Gasolinas / Combustibles |
| 6280004 | Electricidad |
| 6280005 | Agua |
| 6280006 | Telefonía |
| 6280007 | Otros suministros |
| 6290001 | Papelería y material de oficina |
| 6290002 | Restaurante y hostelería |
| 6290003 | Gastos de viaje y locomoción |
| 6290004 | Hosting y servicios web |
| 6290005 | Formación y cursos |
| 6290006 | Otros servicios externos |
| 6310001 | Impuestos y tasas municipales |
| 6310002 | Impuestos y tasas de la comunidad autonoma |
| 6400000 | Nóminas de socios |
| 6400001 | Nóminas de trabajadores |
| 6420000 | Seguridad Social autónomos |
| 6420001 | Seguridad Social régimen general |
| 662 | Intereses de préstamos |
| 669 | Otros gastos financieros |
| 678 | Gastos extraordinarios |
| 680 | Amortización de Invers. Inmateriales |
| 681 | Amortización de Invers. Materiales |
| 682 | Amortización de Invers. Inmobiliarias |
| 699 | Gastos no deducibles |
| 520 | Devolución principal de préstamo |
| 475 | Impuestos trimestrales hacienda estatal |

## Tipos de inversión

Volver

| Código | Significado |
| --- | --- |
| 20 | Inmovilizaciones intangibles |
| 200 | Investigación |
| 201 | Desarrollo |
| 202 | Concesiones administrativas |
| 203 | Propiedad industrial |
| 205 | Derechos de traspaso |
| 206 | Aplicaciones informáticas |
| 21 | Inmovilizaciones materiales |
| 210 | Terrenos y bienes naturales |
| 211 | Construcciones |
| 212 | Instalaciones técnicas |
| 213 | Maquinaria |
| 214 | Utillaje Y herramientas |
| 215 | Otras instalaciones |
| 216 | Mobiliario |
| 217 | Equipos para procesos de información |
| 218 | Elementos de transporte |
| 219 | Otro inmovilizado material |
| 250 | Otras inversiones financieras a largo plazo |
| 260 | Fianzas y depositos constituidos a largo plazo |

## Tipos de ingreso

Volver

| Código | Significado |
| --- | --- |
| 700 | Venta de productos |
| 705 | Prestacion de servicios |
| 730 | Autoconsumo |
| 740 | Subvenciones ejercicio |
| 746 | Subvenciones otros ejercicios |
| 752 | Ingreso por alquileres |
| 754 | Ingresos por comisiones |
| 759 | Otros ingresos |
| 766 | Ingresos financieros |
| 778 | Ingresos extraordinarios |
| 799 | Ingresos no imputables |

## Tipos de venta

Volver

| Código | Significado |
| --- | --- |
| service | Prestación de servicio |
| product | Venta de un producto/bien |

## Tipos de operación

Volver

| Código | Significado |
| --- | --- |
| 01 | Régimen general |
| 02 | Exportación |
| 08 | IGIC |
| 11 | Arrendamiento de local de negocio |
| 17 | IVA OSS |
| 18 | Recargo de equivalencia |
| 20 | Régimen simplificado |

## Tipos de sujeción de IVA

Volver

| Código | Significado |
| --- | --- |
| S1 | Operación sujeta y no exenta sin inversión del sujeto pasivo.<br>El caso general cuando se vende con IVA. |
| S2 | Operación sujeta y no exenta con inversión del sujeto pasivo.<br>El comprador es quien declara el IVA. Operaciones transfronterizas o entre empresas. |
| N1 | Operación no sujeta por el artículo 7, 14 u otros motivos.<br>Operaciones que no pagan IVA. Transmisiones de empresas, entregas gratuitas de bienes… |
| N2 | Operación no sujeta por reglas de localización.<br>Cuando el servicio o producto está fuera del territorio español. |
| E1 | Exenta por el artículo 20.<br>Actividades de formación/educativas, sanitarias o financieras que están exentas de IVA por ley. |
| E2 | Exenta por el artículo 21.<br>Principalmente para exportaciones de bienes fuera de la UE. |
| E3 | Exenta por el artículo 22.<br>Bienes en tránsito dentro de la UE, como las importaciones temporales. |
| E4 | Exenta por el artículo 23 y 24.<br>Relacionado con bienes exportados a territorios fuera de la UE o exenciones en zonas francas. |
| E5 | Exenta por el artículo 25.<br>Venta intracomunitaria de bienes |

## Errores

| Código de error | Significado |
| --- | --- |
| `400` | `Bad Request`<br>La petición no es correcta, revisa los parametros que nos has enviado y sus valores |
| `403` | `Forbidden`<br>No tienes permisos para ejecutar la petición que has hecho. |
| `404` | `Not Found`<br>No podemos encontrar el recurso que nos has pedido. |
| `429` | `Too many request`<br>Has excedido el numero de peticiones por bloque permitidas, deberas esperar hasta que se renueven. |
| `500` | `Internal Server Error`<br>Parece que algo ha ido mal en el servidor, estamos en ello. |