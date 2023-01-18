import { AnalyticsBrowser } from '@segment/analytics-next'
import { useEffect } from 'react'

const analytics = AnalyticsBrowser.load({ writeKey: '<YOUR SEGMENT WRITE KEY>' })

function App() {
    useEffect(() => {
        analytics.identify(
            'Test 1/4',
            {
                email: 'test.user.1@nowhere.com',
                test: 'Amplitude (Actions): false'
            },
            {
                integrations: {
                    'Amplitude (Actions)': false,
                    test: true
                }
            }
        )

        analytics.identify(
            'Test 2/4',
            {
                email: 'test.user.2@nowhere.com',
                test: 'Amplitude (Actions): true'
            },
            {
                integrations: {
                    'Amplitude (Actions)': true,
                    test: true
                }
            }
        )

        analytics.identify(
            'Test 3/4',
            {
                email: 'test.user.3@nowhere.com',
                test: 'Actions Amplitude: false'},
            {
                integrations: {
                    'Actions Amplitude': false,
                    test: true
                }
            }
        )

        analytics.identify(
            'Test 4/4',
            {
                email: 'test.user.4@nowhere.com',
                test: 'Actions Amplitude: true'
            },
            {
                integrations: {
                    'Actions Amplitude': true,
                    test: true
                }
            }
        )
    })

    const result1 = {
        'scenario': 'Amplitude (Actions): false',
        'integrations': {
            'Actions Amplitude': false,
            'test': true
        }
    }

    const result2 = {
        'scenario': 'Amplitude (Actions): true',
        'integrations': {
            'Actions Amplitude': true,
            'test': true
        }
    }

    const result3 = {
        'scenario': 'Actions Amplitude: false',
        'integrations': {
            'Actions Amplitude': false,
            'test': true
        }
    }

    const result4 = {
        'scenario': 'Actions Amplitude: true',
        'integrations': {
            'Actions Amplitude': {
                'session_id': 117846238462
            },
            'test': true
        }
    }

    return (
        <div className='App'>
            <pre>
                {JSON.stringify(result1, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(result2, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(result3, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(result4, null, 2)}
            </pre>
        </div>
    )
}

export default App
