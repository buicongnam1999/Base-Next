import { API_ENDPOINT, DEFAULT_HEADERS, IConnectWalletNonceInput, IConnectWalletNonceResponseClient, IVerifyConnectWalletSignatureInput } from "../model/api"


// Authentication
export const getConnectWalletNonce = async (
    input: IConnectWalletNonceInput,
    additionalHeaders: Record<string, string> = {},
): Promise<Response<IConnectWalletNonceResponseClient>> => {
    if (!input.wallet) {
        return { success: false, data: null, message: 'Missing wallet' }
    }

    try {
        const nonceResponse = await fetch(`${API_ENDPOINT}/api/v1/authentication/nonce?wallet=${input.wallet}`, {
            headers: {
                ...DEFAULT_HEADERS,
                ...additionalHeaders,
            },
        })

        if (nonceResponse.ok) {
            const nonceRawResponse = (await nonceResponse.json()) as Response<IConnectWalletNonceResponseClient>

            if (nonceRawResponse.success) {
                return { success: nonceRawResponse.success, data: nonceRawResponse.data }
            } else {
                return { success: false, data: null, message: nonceRawResponse.message }
            }
        } else {
            const nonceRawResponse = await nonceResponse.text()
            return { success: false, data: null, message: nonceRawResponse }
        }
    } catch (error) {
        console.error('[getConnectWalletNonce]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const verifyConnectWalletSignature = async (
    input: IVerifyConnectWalletSignatureInput,
    additionalHeaders: Record<string, string> = {},
): Promise<Response<IVerifyConnectWalletSignatureResponseClient>> => {
    if (!input.wallet) {
        return { success: false, data: null, message: 'Missing wallet' }
    }
    if (!input.message) {
        return { success: false, data: null, message: 'Missing message' }
    }
    if (!input.signature) {
        return { success: false, data: null, message: 'Missing signature' }
    }

    try {
        const verifySignatureResponse = await fetch(
            `${API_ENDPOINT}/api/v1/authentication/nonce/verify?wallet=${input.wallet}`,
            {
                method: 'POST',
                headers: {
                    ...DEFAULT_HEADERS,
                    ...additionalHeaders,
                },
                body: JSON.stringify({ message: input.message, signature: input.signature }),
            },
        )

        if (verifySignatureResponse.ok) {
            const verifySignatureRawResponse =
                (await verifySignatureResponse.json()) as Response<IVerifyConnectWalletSignatureResponseClient>

            if (verifySignatureRawResponse.success) {
                return { success: verifySignatureRawResponse.success, data: verifySignatureRawResponse.data }
            } else {
                return { success: false, data: null, message: verifySignatureRawResponse.message }
            }
        } else {
            const verifySignatureRawResponse = (await verifySignatureResponse.json()) as { message: string }
            return { success: false, data: null, message: verifySignatureRawResponse.message }
        }
    } catch (error) {
        console.error('[verifyConnectWalletSignature]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

// Maintenance mode
export const getMaintenanceMode = async (
    additionalHeaders: Record<string, string> = {},
): Promise<Response<IMaintenanceModeResponseClient>> => {
    try {
        const maintenanceModeRes = await fetch(`${API_ENDPOINT}/api/v1/remote-config`, {
            headers: {
                ...DEFAULT_HEADERS,
                ...additionalHeaders,
            },
        })

        if (maintenanceModeRes.ok) {
            const maintenanceModeRawResponse = (await maintenanceModeRes.json()) as {
                success: boolean
                result: IMaintenanceModeResponseServer
                message: string
            }

            if (maintenanceModeRawResponse.success) {
                return {
                    success: maintenanceModeRawResponse.success,
                    data: {
                        remoteConfig: {
                            version: maintenanceModeRawResponse.result.remote_config.version,
                            config: {
                                maintenanceMode: maintenanceModeRawResponse.result.remote_config.config.maintenance_mode,
                                maintenanceEndsAt: maintenanceModeRawResponse.result.remote_config.config.maintenance_ends_at,
                            },
                        },
                    },
                }
            } else {
                return { success: false, data: null, message: maintenanceModeRawResponse.message }
            }
        } else {
            const maintenanceModeRawResponse = (await maintenanceModeRes.json()) as { message: string }
            return { success: false, data: null, message: maintenanceModeRawResponse.message }
        }
    } catch (error) {
        console.error('[getMaintenanceMode]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

// Link wallet
export const checkIsWalletLinked = async (
    additionalHeaders: Record<string, string> = {},
): Promise<Response<ICheckIsWalletLinkedResponseClient>> => {
    try {
        const isWalletLinkedRes = await fetch(`${APP_API_ENDPOINT}/api/v1/user/check-wallet-address`, {
            headers: {
                ...DEFAULT_HEADERS,
                ...additionalHeaders,
            },
        })

        const isWalletLinkedRawResponse =
            (await isWalletLinkedRes.json()) as AppApiResponse<ICheckIsWalletLinkedResponseServer>
        if (isWalletLinkedRes.ok) {
            if (isWalletLinkedRawResponse.success && isWalletLinkedRawResponse.data) {
                return {
                    success: Boolean(isWalletLinkedRawResponse.success),
                    data: {
                        isLinked: isWalletLinkedRawResponse.data.wallet_address !== null,
                        email: isWalletLinkedRawResponse.data.email,
                        wallet: isWalletLinkedRawResponse.data.wallet_address,
                    },
                }
            } else {
                return { success: false, data: null, message: isWalletLinkedRawResponse.error?.error_message }
            }
        } else {
            return { success: false, data: null, message: isWalletLinkedRawResponse.error?.error_message }
        }
    } catch (error) {
        console.error('[checkIsWalletLinked]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const linkWallet = async (
    input: LinkWalletInput,
    additionalHeaders: Record<string, string> = {},
): Promise<Response<ILinkWalletResponseClient>> => {
    if (!input.accessToken) {
        return { success: false, data: null, message: 'Missing access token from request body' }
    }
    if (!input.address) {
        return { success: false, data: null, message: 'Missing wallet from request body' }
    }
    if (!input.signature) {
        return { success: false, data: null, message: 'Missing signature from request body' }
    }
    try {
        const linkWalletRes = await fetch(`${APP_API_ENDPOINT}/api/v2/user/verify-email`, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
                ...additionalHeaders,
                Authorization: `Bearer ${input.accessToken}`,
            },
            body: JSON.stringify({ address: input.address, signature: input.signature }),
        })

        const linkWalletRawResponse = (await linkWalletRes.json()) as {
            success: number
            message: string
            error: AppApiError
        }
        if (linkWalletRes.ok) {
            if (linkWalletRawResponse.success) {
                return {
                    success: Boolean(linkWalletRawResponse.success),
                    data: {
                        linked: Boolean(linkWalletRawResponse.success),
                    },
                }
            } else {
                return {
                    success: false,
                    data: null,
                    message: linkWalletRawResponse.error.error_message,
                    errorCode: linkWalletRawResponse.error.error_code,
                }
            }
        } else {
            return {
                success: false,
                data: null,
                message: linkWalletRawResponse.error.error_message,
                errorCode: linkWalletRawResponse.error.error_code,
            }
        }
    } catch (error) {
        console.error('[linkWallet]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const login = async (input: {
    email: string
    password: string
}): Promise<Response<IRegisterAccountResponseClient>> => {
    if (!input.email) {
        return { success: false, data: null, message: 'Missing email' }
    }
    if (!input.password) {
        return { success: false, data: null, message: 'Missing password' }
    }
    try {
        const response = await fetch(`${APP_API_ENDPOINT}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
            },
            body: JSON.stringify({ email: input.email, password: input.password }),
        })

        const rawResponse = (await response.json()) as AppApiResponse<IRegisterAccountResponseServer>

        if (response.ok) {
            if (rawResponse.success && rawResponse.data) {
                return {
                    success: Boolean(rawResponse.success),
                    data: {
                        appAccessToken: rawResponse.data.access_token,
                        expiresIn: rawResponse.data.expires_in,
                        refreshToken: rawResponse.data.refresh_token,
                        tokenType: rawResponse.data.token_type,
                    },
                }
            } else {
                return {
                    success: false,
                    data: null,
                    message: rawResponse.error?.error_message,
                    errorCode: rawResponse.error?.error_code,
                }
            }
        } else {
            return {
                success: false,
                data: null,
                message: rawResponse.error?.error_message,
                errorCode: rawResponse.error?.error_code,
            }
        }
    } catch (error) {
        console.error('[login]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const sendVerificationCode = async (input: { email: string }) => {
    if (!input.email) {
        return { success: false, data: null, message: 'Missing email' }
    }
    try {
        const response = await fetch(`${APP_API_ENDPOINT}/api/v1/auth/send-verification-code`, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
            },
            body: JSON.stringify({ email: input.email }),
        })

        const rawResponse = (await response.json()) as AppApiResponse<IRegisterAccountResponseServer>

        if (response.ok) {
            if (rawResponse.success) {
                return {
                    success: Boolean(rawResponse.success),
                    message: rawResponse?.message,
                }
            } else {
                return {
                    success: false,
                    data: null,
                    message: rawResponse.error?.error_message,
                    errorCode: rawResponse.error?.error_code,
                }
            }
        } else {
            return {
                success: false,
                data: null,
                message: rawResponse.error?.error_message,
                errorCode: rawResponse.error?.error_code,
            }
        }
    } catch (error) {
        console.error('[sendVerificationCode]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const registerAccount = async (input: {
    email: string
    verification_code: number
}): Promise<Response<IRegisterAccountResponseClient>> => {
    if (!input.email) {
        return { success: false, data: null, message: 'Missing email' }
    }
    if (!input.verification_code) {
        return { success: false, data: null, message: 'Missing verification code' }
    }
    try {
        const response = await fetch(`${APP_API_ENDPOINT}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
            },
            body: JSON.stringify({ email: input.email, verification_code: input.verification_code }),
        })

        const rawResponse = (await response.json()) as AppApiResponse<IRegisterAccountResponseServer>
        if (response.ok) {
            if (rawResponse.success && rawResponse.data) {
                return {
                    success: Boolean(rawResponse.success),
                    data: {
                        appAccessToken: rawResponse.data.access_token,
                        expiresIn: rawResponse.data.expires_in,
                        refreshToken: rawResponse.data.refresh_token,
                        tokenType: rawResponse.data.token_type,
                    },
                }
            } else {
                return {
                    success: false,
                    data: null,
                    message: rawResponse.error?.error_message,
                    errorCode: rawResponse.error?.error_code,
                }
            }
        } else {
            return {
                success: false,
                data: null,
                message: rawResponse.error?.error_message,
                errorCode: rawResponse.error?.error_code,
            }
        }
    } catch (error) {
        console.error('[registerAccount]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const refreshAccessToken = async (input: {
    refreshToken: string
    accessToken: string
}): Promise<Response<IRegisterAccountResponseClient>> => {
    if (!input.refreshToken) {
        return { success: false, data: null, message: 'Missing refreshToken' }
    }
    if (!input.accessToken) {
        return { success: false, data: null, message: 'Missing accessToken' }
    }
    try {
        const response = await fetch(`${APP_API_ENDPOINT}/api/v1/auth/refresh-token`, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
            },
            body: JSON.stringify({ refresh_token: input.refreshToken, access_token: input.accessToken }),
        })

        const rawResponse = (await response.json()) as AppApiResponse<IRegisterAccountResponseServer>
        if (response.ok) {
            if (rawResponse.success && rawResponse.data) {
                return {
                    success: Boolean(rawResponse.success),
                    data: {
                        appAccessToken: rawResponse.data.access_token,
                        expiresIn: rawResponse.data.expires_in,
                        refreshToken: rawResponse.data.refresh_token,
                        tokenType: rawResponse.data.token_type,
                    },
                }
            } else {
                return { success: false, data: null, message: rawResponse.error?.error_message }
            }
        } else {
            return { success: false, data: null, message: rawResponse.error?.error_message }
        }
    } catch (error) {
        console.error('[refreshAccessToken]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const updateCredential = async (input: {
    email: string
    verificationCode: string
    newPassword: string
    accessToken: string
}) => {
    if (!input.email) {
        return { success: false, data: null, message: 'Missing email' }
    }
    if (!input.accessToken) {
        return { success: false, data: null, message: 'Missing access token' }
    }
    if (!input.verificationCode) {
        return { success: false, data: null, message: 'Missing access token' }
    }
    if (!input.newPassword) {
        return { success: false, data: null, message: 'Missing password' }
    }
    try {
        const response = await fetch(`${APP_API_ENDPOINT}/api/v1/user/credential`, {
            method: 'PUT',
            headers: {
                ...DEFAULT_HEADERS,
                Authorization: `Bearer ${input.accessToken}`,
            },
            body: JSON.stringify({
                email: input.email,
                verification_code: input.verificationCode,
                new_password: input.newPassword,
            }),
        })

        const rawResponse = (await response.json()) as AppApiResponse<IRegisterAccountResponseServer>

        if (response.ok) {
            if (rawResponse.success) {
                return {
                    success: Boolean(rawResponse.success),
                    message: rawResponse?.message,
                }
            } else {
                return { success: false, data: null, message: rawResponse.error?.error_message }
            }
        } else {
            return { success: false, data: null, message: rawResponse.error?.error_message }
        }
    } catch (error) {
        console.error('[logout]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const sendForgotPasswordVerificationCode = async (input: { email: string }) => {
    if (!input.email) {
        return { success: false, data: null, message: 'Missing email' }
    }
    try {
        const response = await fetch(`${APP_API_ENDPOINT}/api/v1/auth/forget-password-request`, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
            },
            body: JSON.stringify({ email: input.email }),
        })

        const rawResponse = (await response.json()) as AppApiResponse<IRegisterAccountResponseServer>

        if (response.ok) {
            if (rawResponse.success) {
                return {
                    success: Boolean(rawResponse.success),
                    message: rawResponse?.message,
                }
            } else {
                return {
                    success: false,
                    data: null,
                    message: rawResponse.error?.error_message,
                    error_code: rawResponse.error?.error_code,
                }
            }
        } else {
            return {
                success: false,
                data: null,
                message: rawResponse.error?.error_message,
                error_code: rawResponse.error?.error_code,
            }
        }
    } catch (error) {
        console.error('[sendVerificationCode]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const forgotPassword = async (input: IForgotPasswordInput): Promise<Response<undefined>> => {
    if (!input.email) {
        return { success: false, data: null, message: 'Missing email' }
    }
    if (!input.verificationCode) {
        return { success: false, data: null, message: 'Missing verification code' }
    }
    if (!input.newPassword) {
        return { success: false, data: null, message: 'Missing new password' }
    }
    try {
        const response = await fetch(`${APP_API_ENDPOINT}/api/v1/auth/forget-password`, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
            },
            body: JSON.stringify({
                email: input.email,
                verification_code: input.verificationCode,
                new_password: input.newPassword,
            }),
        })

        const rawResponse = (await response.json()) as AppApiResponse<undefined>
        if (response.ok) {
            if (rawResponse.success) {
                return {
                    success: Boolean(rawResponse.success),
                    data: null,
                }
            } else {
                return {
                    success: false,
                    data: null,
                    message: rawResponse.error?.error_message,
                    errorCode: rawResponse.error?.error_code,
                }
            }
        } else {
            return {
                success: false,
                data: null,
                message: rawResponse.error?.error_message,
                errorCode: rawResponse.error?.error_code,
            }
        }
    } catch (error) {
        console.error('[forgotPassword]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}

export const logout = async (input: { accessToken: string }) => {
    if (!input.accessToken) {
        return { success: false, data: null, message: 'Missing access token' }
    }
    try {
        const response = await fetch(`${APP_API_ENDPOINT}/api/v1/auth/logout`, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
                Authorization: `Bearer ${input.accessToken}`,
            },
        })

        const rawResponse = (await response.json()) as AppApiResponse<IRegisterAccountResponseServer>

        if (response.ok) {
            if (rawResponse.success) {
                return {
                    success: Boolean(rawResponse.success),
                    message: rawResponse.message,
                }
            } else {
                return { success: false, data: null, message: rawResponse.error?.error_message }
            }
        } else {
            return { success: false, data: null, message: rawResponse.error?.error_message }
        }
    } catch (error) {
        console.error('[updateCredential]: ', error)
        return { success: false, data: null, message: 'Internal server error' }
    }
}
