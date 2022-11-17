# be-objectified

Read a string from (session)Storage, parse as JSON, and optionally pull a value from a path.

```html
<input type=hidden be-objectified='{
    "setProp": "value",
    "from": "sessionStorage",
    "key": "key",
    "path": "a.b.c.d"
}'>
```