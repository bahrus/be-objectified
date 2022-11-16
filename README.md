# be-objectified

Reads a string from (session)Storage, parses as JSON, pulls a value from an optional path.

```html
<input type=hidden be-objectified='{
    "from": "sessionStorage",
    "key": "key",
    "path": "a.b.c.d"
}'>
```