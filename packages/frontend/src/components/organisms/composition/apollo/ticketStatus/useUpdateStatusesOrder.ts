import { useUpdateStatusesOrderMutation } from '@/generated/graphql'

export function useUpdateStatusesOrder() {
  const { mutate } = useUpdateStatusesOrderMutation({
    optimisticResponse: variables => ({
      updateStatusesOrder: (Array.isArray(variables.ids) ? variables.ids : [variables.ids]).map((id, index) => ({
        id,
        order: index,
        updatedAt: new Date().toISOString(),
      })),
    }),
  })
  function updateStatusesOrder(ids: string[]) {
    return mutate({ ids })
  }

  return { updateStatusesOrder }
}
