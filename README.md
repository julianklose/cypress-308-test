# cypress-308-test

Repo for Cypress issue
https://github.com/cypress-io/cypress/issues/28058
"API call changes method on 308 redirect"

## Purpose

This branch demonstrates the non-compliance of [@cypress/request](https://github.com/cypress-io/request) in `cypress@13.3.2` to [RFC 9110 - HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) section [15.4.9 HTTP 308 (Permanent Redirect)](https://www.rfc-editor.org/rfc/rfc9110#name-308-permanent-redirect).

## Reference

[RFC 9110 - 15.4 Redirection 3xx](https://www.rfc-editor.org/rfc/rfc9110#name-redirection-3xx) states:

> [307 (Temporary Redirect)](https://www.rfc-editor.org/rfc/rfc9110#status.307) and [308 (Permanent Redirect)](https://www.rfc-editor.org/rfc/rfc9110#status.308) [RFC7538](https://www.rfc-editor.org/rfc/rfc9110#RFC7538) were later added to unambiguously indicate method-preserving redirects, and status codes [301](https://www.rfc-editor.org/rfc/rfc9110#status.301) and [302](https://www.rfc-editor.org/rfc/rfc9110#status.302) have been adjusted to allow a POST request to be redirected as GET.

## Current behavior

Calling [@cypress/request](https://github.com/cypress-io/request) with POST method to a URL that returns an HTTP 308 (Permanent Redirect) status code, causes a GET request to be sent to the redirected URL.

## Desired behavior

If a URL responds with HTTP 308 (Permanent Redirect) status code to a [@cypress/request](https://github.com/cypress-io/request) where the POST method has been used, then a method-preserving POST request should be sent to the redirected URL. No GET request should be sent.

## Test code to reproduce

Execute

```bash
git clone https://github.com/julianklose/cypress-308-test.git
cd cypress-308-test
npm ci
npm test
```

### Cypress test spec

```js
describe('308 redirect', () => {
  it('POST request to test', () => {
    cy.request("POST", "/test").its("body").should("eq", "POST");
  })
});
```

### serve configuration

```js
module.exports = (req, res, next) => {
  if (req.path != "/target")
    res.redirect(308, "/target");
  else
    res.status(200).send(req.method);
};
```

## Cypress version

`13.3.2`

## Node version

`v18.18.2`

## Operating System

`Windows 10.0.19045.3570`

## Logs

```text
  1) 308 redirect
       POST request to test:

      Timed out retrying after 4000ms
      + expected - actual

      -'GET'
      +'POST'
```
