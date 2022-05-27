import amplitude from 'amplitude-js';

const getApiKey = () => {
    return window.location.hostname === 'arbeidsgiver.nav.no'
        ? process.env.AMPLITUDE_API_KEY_PROD
        : process.env.AMPLITUDE_API_KEY_DEV;
};

const instance = amplitude.getInstance();
instance.init(getApiKey(), '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
});

export default instance;
