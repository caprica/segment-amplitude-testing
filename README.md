# Segment Analytics with Amplitude (Testing)

This small project tests the Segment Analytics integration with Amplitude.

Some weird stuff happens.

## Test Scenarios

Four events are sent to Segment, with different `integrations` settings.

In the fragments below, it shows a fragment of the raw message received by
Segment, visible in the sources debugger in the dashboard.

---

### Test 1

```js
analytics.identify(
    'Test 1/4',
    {
        test: 'Amplitude (Actions): false'
    },
    {
        integrations: {
            'Amplitude (Actions)': false,
            test: true
        }
    }
)
```

Result:

```json
{
  "integrations": {
    "Actions Amplitude": false,
    "test": true
  }
}
```

---

### Test 2

```js
analytics.identify(
    'Test 2/4',
    {
        test: 'Amplitude (Actions): true'
    },
    {
        integrations: {
            'Amplitude (Actions)': true,
            test: true
        }
    }
)
```

Result:

```json
{
  "integrations": {
    "Actions Amplitude": true,
    "test": true
  }
}
```

---

### Test 3

```js
analytics.identify(
    'Test 3/4',
    {
        test: 'Actions Amplitude: false'
    },
    {
        integrations: {
            'Actions Amplitude': false,
            test: true
        }
    }
)
```

Result:

```json
{
  "integrations": {
    "Actions Amplitude": false,
    "test": true
  }
}
```

---

### Test 4

```js
analytics.identify(
    'Test 4/4',
    {
        test: 'Actions Amplitude: true'
    },
    {
        integrations: {
            'Actions Amplitude': true,
            test: true
        }
    }
)
```

Result:

```json
{
  "integrations": {
    "Actions Amplitude": {
      "session_id": 117846238462
    },
    "test": true
  }
}
```

---

## Conclusion

Test case 4 is the only one that made it through to Amplitude.
