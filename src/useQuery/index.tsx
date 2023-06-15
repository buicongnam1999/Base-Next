export const useQueryTan = () => {

    useEffect(() => {
        const accountInfoFromCookie = (getCookie(COOKIES_KEY.ACCOUNT_INFO, { domain: COOKIE_DOMAIN }) as string) ?? '{}'
        const userObj: IUser = safeParseJSON(accountInfoFromCookie)
        setUser(userObj)
      }, [])

    const { mutate } = useMutation<Resume, ServerError, ICreateResumeInput>(createResume as any, {
        onSuccess: async (newResume: any) => {
          await queryClient.cancelQueries({ queryKey: [REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page] })
    
          const previousResumes = queryClient.getQueryData([REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page])
    
          const data = newResume.data.createResume
          window.open(`${CV_CREATION_BASE_URL}/${data?.user.username}/${data?.id}/build?id=${data?.id}`, '_blank')
    
          queryClient.setQueryData([REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page], (old: any) => {
            return {
              ...old,
              data: {
                resumes: {
                  docs: [{ ...old.data.resumes.docs[0], ...newResume.data.createResume }, ...old.data.resumes.docs],
                },
              },
            }
          })
    
          return { previousResumes }
        },
        onError: (context: any) => {
          queryClient.setQueryData([REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page], context.previousResumes)
        },
        onSettled: () => {
          setTimeout(() => {
            void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page] })
          }, 6000)
        },
      })

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const rename = useMutation<Resume, ServerError, IRenameResume>(renameResume as any, {
    onMutate: async (newResume: any) => {
      if (typeRename === RENAME_RESUME.RENAME_IN_LIST) {
        await queryClient.cancelQueries({ queryKey: [REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page] })

        const previous = queryClient.getQueryData([REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page])

        queryClient.setQueryData([REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page], (old: any) => {
          // eslint-disable-next-line max-len
          const newDocs = old.docs.map((element: any) => {
            if (element.id === newResume.saveResumeId) {
              return {
                ...element,
                name: newResume.name,
              }
            }

            return {
              ...element,
            }
          })

          return {
            ...old,
            docs: newDocs,
          }
        })

        return { previous }
      } else if (typeRename === RENAME_RESUME.RENAME_PINNED) {
        await queryClient.cancelQueries({ queryKey: [REACT_QUERY_KEY.GET_PINNED_RESUME] })

        const previous = queryClient.getQueryData([REACT_QUERY_KEY.GET_PINNED_RESUME])

        queryClient.setQueryData([REACT_QUERY_KEY.GET_PINNED_RESUME], (old: any) => {
          return {
            ...old,
            data: {
              pinnedResume: {
                ...old.data.pinnedResume,
                name: newResume.name,
              },
            },
          }
        })

        return { previous }
      }
    },

    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY.GET_ALL_RESUMES, router.query.page] })
        queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY.GET_PINNED_RESUME] })
      }, 2500)
    },
  })

    return <div>
        hdjshd
    </div>
}