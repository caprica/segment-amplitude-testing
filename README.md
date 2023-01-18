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

Test cases 2 and 4 make it through to Amplitude.

## Interaction with Consent Manager

The Consent Manager is an Open Source project separate from Segment Analytics
that provides an out-of-the-box consent management solution.

It seems that this Consent Manager, when it generates the `integrations`
object, includes this setting:

```json
{
  "integrations": {
    "all": false
  }
}
```

With this setting, you end up with:

```json
{
  "integrations": {
    "Actions Amplitude": {
      "session_id": 117846238462
    },
    "all": false
  }
}
```

When this reaches Segment's analytics, Segment sees the "all" setting is false.

Ordinarily, explicitly setting true for one of the integrations will override
the all setting. However, the Amplitude integration does not have a true value,
it has instead this object value containing the session id.

Consequently, when using Consent Manager, analytics data will *not* be sent to
Amplitude.
