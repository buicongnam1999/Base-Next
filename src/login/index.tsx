export const LoginScreen = (): JSX.Element => {
  const { setWebAccountInfo, setAppAccountInfo } = useBoundStore((store) => ({
    setWebAccountInfo: store.saveWebAccountInfo,
    setAppAccountInfo: store.saveAppAccountInfo,
  }))
  const router = useRouter()
  const [formInput, setFormInput] = useState<FormLoginType>({
    email: '',
    password: '',
  })
  const { errors, validateForm, onBlurField } = useLoginFormValidator(formInput)

  const [checked, setChecked] = useState<boolean>(false)
  const [hideText, setHideText] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { mutate, isLoading } = useMutation<IAuthenticatePayload, ServerError, IAuthenticateInput>(login as any, {
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data

      const appAccountToken: AppAccountInfo = {
        appAccessToken: accessToken,
        refreshToken,
      }
      const accountInfo = {
        email: data?.user?.email,
        id: data?.user?.id,
        username: data?.user?.username,
        isLinked: false,
        codeExpiredAt: 0,
      }
      setCookie(COOKIES_KEY.ACCOUNT_INFO, JSON.stringify(accountInfo), { domain: COOKIE_DOMAIN })
      setCookie(COOKIES_KEY.WEB_ACCESS_TOKEN, JSON.stringify(appAccountToken), {
        domain: COOKIE_DOMAIN,
      })

      setWebAccountInfo(accountInfo)
      setAppAccountInfo(appAccountToken)
      notify(NOTIFICATION_TYPE.SUCCESS, 'Đăng nhập thành công')
      setTimeout(() => void router.push('/'), 2000)
    },
    onError: (error) => {
      logger.error('[sendVerificationCode]', error?.toString())
      notify(NOTIFICATION_TYPE.ERROR, FORMATTED_APOLLO_ERROR.get(error?.message) ?? DEFAULT_ERROR)
    },
  })

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name
    const nextFormState = {
      ...formInput,
      [field]: e.target.value,
    }
    setFormInput(nextFormState)
    if (errors[field].dirty) {
      validateForm({
        form: nextFormState,
        errors,
        field,
      })
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const { isValid } = validateForm({ form: formInput, errors, forceTouchErrors: true })
    if (!isValid) {
      return
    }

    mutate({
      email: formInput.email,
      password: formInput.password,
    })
  }

  const changeStatusPassword = (): void => {
    setHideText(!hideText)
  }

  const handleLoginGoogle = async (): Promise<void> => {
    await signIn('google', { callbackUrl: '' })
  }

  return <div></div>

}