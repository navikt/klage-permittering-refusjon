const { Issuer } = require('openid-client');
const jws = require('jws');

const testJwk = JSON.stringify({
    p:
        '6HYWIz5pqpcHWCbeNk38V9CPrKMjDX7xTYMoxlJMgqEgBVIcouM-Frj9oXd_RSCs7O4B4w0xSxg5WC08rS6kfa27FrYL4nTSVEZ--6nmoz2JAegZ7T3hNKFr1IEjtGR5BoXM1TWiskLtLidjDIKmnFCMw6fDgBhTKwhScHHlP70',
    kty: 'RSA',
    q:
        'mzbTzupT0cmv19nyBOCFRZssG-YVydrsZTS1s2SkJf0hdVhZRyIa4cCXzi23HcvUCM1g93W3TrK6VXhY6eceiudeaRcPFi20f6yy49BgWf-Gx9pfNkXkgSuUieVKW_MwaAruumuEj6O4UoXUKKGJys8s2b_rwIpIzms774jOG_k',
    d:
        'R2UaNYh1YGml0kdu9LOZNm4R-Pepdz9oTynHy6vZGazw5F3eukYB33H3hnCSEOFZzB8Ecoiynh1-2mkullk5eUc2l1cnzqEuSYH1birj6qb0Va9CttgpLX6VG1MC_x-TyIuhHNeKR7MfEhLa2OW-_TLH0L1_p_a9ExrkDwoJKdMKaaIHI1ccxYjuyqstXeIUacksSC8Na-Z0iRmNSngXwY7r23wc7Ya3tlhS-Ku1g5ZFeoNR4T6Okvk2n9-ujlBapUF5UswB__zI3VfV7JkV65fSq3MPRaCmNRSPcu5UYi2JwZ1QSKDmRc4KhEPS62ACqjzN6OpnUlVt7A3BkzhxwQ',
    e: 'AQAB',
    use: 'sig',
    kid: 'test-id',
    qi:
        'sZ4nVHVY3ckJ6d8JOx4GWgRC3MCdp3Z3R6FI1UX2UbDfxUVcmHKTEJW6LlMzQ_hqjLASjrhWVR63AVKpLu2LYx8Kq_wOhXVkTgR853smFyYaG5yLJcnWeZbSJyv-3Bn4HPJfW24p8aGy29W7KNSxHRNyZU5Rk0q8KM1gTUtVXbU',
    dp:
        'edyNtmQdmKQb4YZerzEqvA5Fg0byNTz62puLYIv8N-6njqKBCJMAFYFc1KyEN4TtojcTHifoU2mbhjIQwOjWqlvM3BcLG-gJ6swZ_WwP0DuN-0XlcY0i5ihJEtmwEf0pxNWXj53ScIjNNYjIT-Kd3QwM_vSPdDNMRh7SuMe8WjE',
    alg: 'RS256',
    dq:
        'das3ICKdsOmKGcXsqK3d20ssQWpJEmKZ3I_9QCcIGpSwjNmRtU-xuXvcmj4mGLyx3op0_KWNdmggwzMdlRXWHdARzvHgShwUPsaaSANtSE1jzJdMn0SVWyfC0Fe368WN6RKAsWtZb9vanRVAJh1w7QPrKJlLDQjI8VRyd8HrH2E',
    n:
        'jPFIpTpGDmWu4GC9e7l4wmGRCtLoWUXYeeqdwPMY43AIxSc2dVdHGBLOwjuwff-O1xcPqnmZzPO3NFwsWhEOWM8IPW0jp8pONqD5G2iQ5Faq02j8HUNxehlYD_qO7CPdVLY_FQar1Tp9DkfgYbjmnyTqBOI41ASK0ViofdV3SvoRKu95Igx3RySBaoUPxnIWLcsJbe8uBJ_PflABHCN2ZkLwlx7TaJbfAUWuNQiZHQ1v8mOsingTcVhG5PFbqWDz_X8H4IRr-wcWxvPmNItE5bDJbh_0juQzC7c5LnGywwyFjc-EYs8P-78-1v-GkQyPnDZap13yP2qzfYwqp8nt1Q',
});

const API_AUDIENCE = process.env.API_AUDIENCE;
const TOKEN_X_CLIENT_ID = process.env.TOKEN_X_CLIENT_ID;
const TOKEN_X_WELL_KNOWN_URL =
    process.env.TOKEN_X_WELL_KNOWN_URL ||
    'http://localhost:9000/tokenx/.well-known/openid-configuration';

const TOKEN_X_PRIVATE_JWK = JSON.parse(process.env.TOKEN_X_PRIVATE_JWK || testJwk);

const getConfiguredTokenXClient = async () => {
    const issuer = await Issuer.discover(TOKEN_X_WELL_KNOWN_URL);
    console.log(`Discovered issuer ${issuer.issuer}`);
    tokenXIssuer = issuer.token_endpoint;

    if (!TOKEN_X_PRIVATE_JWK) {
        throw new Error('JWK cannot be null');
    }
    return {
        tokenXClient: new issuer.Client(
            {
                client_id: TOKEN_X_CLIENT_ID,
                token_endpoint_auth_method: 'private_key_jwt',
                token_endpoint_auth_signing_alg: 'RS256',
            },
            {
                keys: [TOKEN_X_PRIVATE_JWK],
            }
        ),
        tokenXIssuer,
    };
};

const getTestTokenX = req => {
    return req.cookies['localhost-tokendings'];
};

const getBearerAuth = req => {
    return req.headers['authorization']?.replace('Bearer', '')?.trim();
};

const tokenHasExpired = idPortenAccessToken => {
    const expiration = jws.decode(idPortenAccessToken)?.payload?.exp;
    if (!expiration) {
        return false;
    }
    // Convert seconds to milliseconds
    return expiration * 1000 - Date.now() < 0;
};

const ensureAuthenticated = async (req, res, next) => {
    var token = getBearerAuth(req);
    if (!token) {
        token = getTestTokenX(req);
    }

    if (token && !tokenHasExpired(token)) {
        next();
    } else {
        console.log('not authenticated');
        res.sendStatus(401);
    }
};

const exchangeToken = (tokenXClient, tokenXIssuer, req) => {
    return new Promise((resolve, reject) => {
        const additionalClaims = {
            clientAssertionPayload: {
                nbf: Math.floor(Date.now() / 1000),
                aud: [tokenXIssuer],
            },
        };
        // Ved lokal kjøring har vi allerede tokenX og trenger ikke gjøre token exchange
        if (getTestTokenX(req)) {
            return resolve(getTestTokenX(req));
        }

        const idPortenAccessToken = getBearerAuth(req);

        console.log('Lager grant for ny token fra tokendings');
        tokenXClient
            .grant(
                {
                    grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                    subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                    audience: API_AUDIENCE,
                    subject_token: idPortenAccessToken,
                },
                additionalClaims
            )
            .then(tokenSet => {
                resolve(tokenSet.access_token);
            })
            .catch(error => {
                console.error(error);
                console.log(error.response.body);
                reject(error);
            });
    });
};

const BACKEND_BASEURL = process.env.BACKEND_BASEURL || 'http://localhost:8080';

const apiTokenExchange = (app, tokenXClient, tokenXIssuer) => {
    app.use(
        '/klage-permittering-refusjon/api',
        ensureAuthenticated,
        proxy(`${BACKEND_BASEURL}`, {
            timeout: 10000,
            proxyReqPathResolver: req => {
                return `/klage-permittering-refusjon-api${req.url}`;
            },
            proxyReqOptDecorator: (options, req) => {
                return new Promise((resolve, reject) => {
                    exchangeToken(tokenXClient, tokenXIssuer, req).then(
                        access_token => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            resolve(options);
                        },
                        error => {
                            console.log(12, error);
                            reject(error);
                        }
                    );
                });
            },
        })
    );
};

module.exports = { 
	apiTokenExchange,
	getConfiguredTokenXClient
}
