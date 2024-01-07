/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable import/no-named-as-default */
import * as VueApolloComposable from '@vue/apollo-composable'
import gql from 'graphql-tag'

import type * as VueCompositionApi from 'vue'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type ReactiveFunction<TParam> = () => TParam
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: string; output: string }
}

export type AuthenticationResponse = {
  __typename?: 'AuthenticationResponse'
  token: Scalars['String']['output']
  user: User
}

export type ColorBase = {
  __typename?: 'ColorBase'
  hue: Scalars['Int']['output']
  saturation: Scalars['Int']['output']
}

export type ColorBaseInput = {
  hue: Scalars['Int']['input']
  saturation: Scalars['Int']['input']
}

export type CreateTicketCommentInput = {
  comment: Scalars['String']['input']
  id: Scalars['ID']['input']
}

export type CreateTicketInput = {
  description: Scalars['String']['input']
  id: Scalars['ID']['input']
  statusId: Scalars['String']['input']
  title: Scalars['String']['input']
}

export type CreateTicketStatusInput = {
  colorBase: ColorBaseInput
  description: Scalars['String']['input']
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
  order: Scalars['Int']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  authenticate: AuthenticationResponse
  createTicket: Ticket
  createTicketStatus: TicketStatus
  ticket: TicketMutation
  ticketStatus: TicketStatusMutation
  updateDisplayName: AuthenticationResponse
}

export type MutationAuthenticateArgs = {
  username: Scalars['String']['input']
}

export type MutationCreateTicketArgs = {
  input: CreateTicketInput
}

export type MutationCreateTicketStatusArgs = {
  input: CreateTicketStatusInput
}

export type MutationTicketArgs = {
  id: Scalars['ID']['input']
}

export type MutationTicketStatusArgs = {
  id: Scalars['ID']['input']
}

export type MutationUpdateDisplayNameArgs = {
  displayName: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  me?: Maybe<User>
  ticket?: Maybe<Ticket>
  ticketStatus?: Maybe<TicketStatus>
  ticketStatuses: Array<TicketStatus>
  tickets: TicketConnection
  user?: Maybe<User>
  users: Array<User>
}

export type QueryTicketArgs = {
  id: Scalars['ID']['input']
}

export type QueryTicketStatusArgs = {
  id: Scalars['ID']['input']
}

export type QueryTicketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
}

export type QueryUserArgs = {
  id: Scalars['ID']['input']
}

export type Ticket = {
  __typename?: 'Ticket'
  assignee?: Maybe<User>
  author: User
  comments: TicketCommentConnection
  createdAt: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  status: TicketStatus
  title: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type TicketCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
}

export type TicketComment = {
  __typename?: 'TicketComment'
  author: User
  comment: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  ticket: Ticket
  updatedAt: Scalars['DateTime']['output']
}

export type TicketCommentConnection = {
  __typename?: 'TicketCommentConnection'
  endCursor?: Maybe<Scalars['String']['output']>
  items: Array<TicketComment>
  totalCount: Scalars['Int']['output']
}

export type TicketCommentMutation = {
  __typename?: 'TicketCommentMutation'
  remove: Scalars['Boolean']['output']
  update: TicketComment
}

export type TicketCommentMutationUpdateArgs = {
  comment: Scalars['String']['input']
}

export type TicketConnection = {
  __typename?: 'TicketConnection'
  endCursor?: Maybe<Scalars['String']['output']>
  items: Array<Ticket>
  totalCount: Scalars['Int']['output']
}

export type TicketMutation = {
  __typename?: 'TicketMutation'
  comment: TicketCommentMutation
  createComment: TicketComment
  remove: Scalars['Boolean']['output']
  update: Ticket
}

export type TicketMutationCommentArgs = {
  id: Scalars['ID']['input']
}

export type TicketMutationCreateCommentArgs = {
  input: CreateTicketCommentInput
}

export type TicketMutationUpdateArgs = {
  input: UpdateTicketInput
}

export type TicketStatus = {
  __typename?: 'TicketStatus'
  colorBase: ColorBase
  createdAt: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  order: Scalars['Int']['output']
  tickets: TicketConnection
  updatedAt: Scalars['DateTime']['output']
}

export type TicketStatusTicketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
}

export type TicketStatusMutation = {
  __typename?: 'TicketStatusMutation'
  remove: Scalars['Boolean']['output']
  update: TicketStatus
}

export type TicketStatusMutationUpdateArgs = {
  input: UpdateTicketStatusInput
}

export type UpdateTicketInput = {
  description?: InputMaybe<Scalars['String']['input']>
  statusId?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type UpdateTicketStatusInput = {
  colorBase?: InputMaybe<ColorBaseInput>
  description?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
}

export type User = {
  __typename?: 'User'
  assignedTickets: TicketConnection
  createdAt: Scalars['DateTime']['output']
  createdTickets: TicketConnection
  displayName: Scalars['String']['output']
  id: Scalars['ID']['output']
  updatedAt: Scalars['DateTime']['output']
  username: Scalars['String']['output']
}

export type UserAssignedTicketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
}

export type UserCreatedTicketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
}

export type UpdateTicketMutationVariables = Exact<{
  ticketId: Scalars['ID']['input']
  input: UpdateTicketInput
}>

export type UpdateTicketMutation = {
  __typename?: 'Mutation'
  ticket: {
    __typename?: 'TicketMutation'
    update: {
      __typename?: 'Ticket'
      id: string
      title: string
      createdAt: string
      updatedAt: string
      status: { __typename?: 'TicketStatus'; id: string; createdAt: string; updatedAt: string }
    }
  }
}

export type TicketQueryVariables = Exact<{
  ticketId: Scalars['ID']['input']
}>

export type TicketQuery = {
  __typename?: 'Query'
  ticket?: {
    __typename?: 'Ticket'
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    assignee?: { __typename?: 'User'; id: string; createdAt: string; updatedAt: string } | null
    status: { __typename?: 'TicketStatus'; id: string; createdAt: string; updatedAt: string }
  } | null
}

export type UserCreatedTicketsQueryVariables = Exact<{
  userId: Scalars['ID']['input']
  first: Scalars['Int']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserCreatedTicketsQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    createdAt: string
    updatedAt: string
    createdTickets: {
      __typename?: 'TicketConnection'
      totalCount: number
      endCursor?: string | null
      items: Array<{ __typename?: 'Ticket'; id: string; createdAt: string; updatedAt: string }>
    }
  } | null
}

export type UserAssignedTicketsQueryVariables = Exact<{
  userId: Scalars['ID']['input']
  first: Scalars['Int']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserAssignedTicketsQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    createdAt: string
    updatedAt: string
    assignedTickets: {
      __typename?: 'TicketConnection'
      totalCount: number
      endCursor?: string | null
      items: Array<{ __typename?: 'Ticket'; id: string; createdAt: string; updatedAt: string }>
    }
  } | null
}

export type TicketStatusesQueryVariables = Exact<{ [key: string]: never }>

export type TicketStatusesQuery = {
  __typename?: 'Query'
  ticketStatuses: Array<{
    __typename?: 'TicketStatus'
    id: string
    order: number
    createdAt: string
    updatedAt: string
  }>
}

export type TicketStatusBaseQueryVariables = Exact<{
  ticketStatusId: Scalars['ID']['input']
}>

export type TicketStatusBaseQuery = {
  __typename?: 'Query'
  ticketStatus?: {
    __typename?: 'TicketStatus'
    id: string
    name: string
    createdAt: string
    updatedAt: string
    colorBase: { __typename?: 'ColorBase'; hue: number; saturation: number }
  } | null
}

export type AuthenticateMutationVariables = Exact<{
  username: Scalars['String']['input']
}>

export type AuthenticateMutation = {
  __typename?: 'Mutation'
  authenticate: { __typename?: 'AuthenticationResponse'; token: string }
}

export type UpdateDisplayNameMutationVariables = Exact<{
  displayName: Scalars['String']['input']
}>

export type UpdateDisplayNameMutation = {
  __typename?: 'Mutation'
  updateDisplayName: { __typename?: 'AuthenticationResponse'; token: string }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: string
    username: string
    displayName: string
    createdAt: string
    updatedAt: string
  } | null
}

export type UserQueryVariables = Exact<{
  userId: Scalars['ID']['input']
}>

export type UserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    username: string
    displayName: string
    createdAt: string
    updatedAt: string
  } | null
}

export const UpdateTicketDocument = gql`
  mutation UpdateTicket($ticketId: ID!, $input: UpdateTicketInput!) {
    ticket(id: $ticketId) {
      update(input: $input) {
        id
        title
        createdAt
        updatedAt
        status {
          id
          createdAt
          updatedAt
        }
      }
    }
  }
`

/**
 * __useUpdateTicketMutation__
 *
 * To run a mutation, you first call `useUpdateTicketMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTicketMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateTicketMutation({
 *   variables: {
 *     ticketId: // value for 'ticketId'
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTicketMutation(
  options:
    | VueApolloComposable.UseMutationOptions<UpdateTicketMutation, UpdateTicketMutationVariables>
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<UpdateTicketMutation, UpdateTicketMutationVariables>
      > = {},
) {
  return VueApolloComposable.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(
    UpdateTicketDocument,
    options,
  )
}
export type UpdateTicketMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  UpdateTicketMutation,
  UpdateTicketMutationVariables
>
export const TicketDocument = gql`
  query Ticket($ticketId: ID!) {
    ticket(id: $ticketId) {
      id
      title
      description
      assignee {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      status {
        id
        createdAt
        updatedAt
      }
    }
  }
`

/**
 * __useTicketQuery__
 *
 * To run a query within a Vue component, call `useTicketQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTicketQuery({
 *   ticketId: // value for 'ticketId'
 * });
 */
export function useTicketQuery(
  variables:
    | TicketQueryVariables
    | VueCompositionApi.Ref<TicketQueryVariables>
    | ReactiveFunction<TicketQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TicketQuery, TicketQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TicketQuery, TicketQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TicketQuery, TicketQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<TicketQuery, TicketQueryVariables>(TicketDocument, variables, options)
}
export function useTicketLazyQuery(
  variables:
    | TicketQueryVariables
    | VueCompositionApi.Ref<TicketQueryVariables>
    | ReactiveFunction<TicketQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TicketQuery, TicketQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TicketQuery, TicketQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TicketQuery, TicketQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<TicketQuery, TicketQueryVariables>(TicketDocument, variables, options)
}
export type TicketQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<TicketQuery, TicketQueryVariables>
export const UserCreatedTicketsDocument = gql`
  query UserCreatedTickets($userId: ID!, $first: Int!, $after: String) {
    user(id: $userId) {
      id
      createdAt
      updatedAt
      createdTickets(first: $first, after: $after) {
        totalCount
        endCursor
        items {
          id
          createdAt
          updatedAt
        }
      }
    }
  }
`

/**
 * __useUserCreatedTicketsQuery__
 *
 * To run a query within a Vue component, call `useUserCreatedTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCreatedTicketsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserCreatedTicketsQuery({
 *   userId: // value for 'userId'
 *   first: // value for 'first'
 *   after: // value for 'after'
 * });
 */
export function useUserCreatedTicketsQuery(
  variables:
    | UserCreatedTicketsQueryVariables
    | VueCompositionApi.Ref<UserCreatedTicketsQueryVariables>
    | ReactiveFunction<UserCreatedTicketsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserCreatedTicketsQuery, UserCreatedTicketsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<UserCreatedTicketsQuery, UserCreatedTicketsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<UserCreatedTicketsQuery, UserCreatedTicketsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<UserCreatedTicketsQuery, UserCreatedTicketsQueryVariables>(
    UserCreatedTicketsDocument,
    variables,
    options,
  )
}
export function useUserCreatedTicketsLazyQuery(
  variables:
    | UserCreatedTicketsQueryVariables
    | VueCompositionApi.Ref<UserCreatedTicketsQueryVariables>
    | ReactiveFunction<UserCreatedTicketsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserCreatedTicketsQuery, UserCreatedTicketsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<UserCreatedTicketsQuery, UserCreatedTicketsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<UserCreatedTicketsQuery, UserCreatedTicketsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<UserCreatedTicketsQuery, UserCreatedTicketsQueryVariables>(
    UserCreatedTicketsDocument,
    variables,
    options,
  )
}
export type UserCreatedTicketsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  UserCreatedTicketsQuery,
  UserCreatedTicketsQueryVariables
>
export const UserAssignedTicketsDocument = gql`
  query UserAssignedTickets($userId: ID!, $first: Int!, $after: String) {
    user(id: $userId) {
      id
      createdAt
      updatedAt
      assignedTickets(first: $first, after: $after) {
        totalCount
        endCursor
        items {
          id
          createdAt
          updatedAt
        }
      }
    }
  }
`

/**
 * __useUserAssignedTicketsQuery__
 *
 * To run a query within a Vue component, call `useUserAssignedTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAssignedTicketsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserAssignedTicketsQuery({
 *   userId: // value for 'userId'
 *   first: // value for 'first'
 *   after: // value for 'after'
 * });
 */
export function useUserAssignedTicketsQuery(
  variables:
    | UserAssignedTicketsQueryVariables
    | VueCompositionApi.Ref<UserAssignedTicketsQueryVariables>
    | ReactiveFunction<UserAssignedTicketsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserAssignedTicketsQuery, UserAssignedTicketsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<UserAssignedTicketsQuery, UserAssignedTicketsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<UserAssignedTicketsQuery, UserAssignedTicketsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<UserAssignedTicketsQuery, UserAssignedTicketsQueryVariables>(
    UserAssignedTicketsDocument,
    variables,
    options,
  )
}
export function useUserAssignedTicketsLazyQuery(
  variables:
    | UserAssignedTicketsQueryVariables
    | VueCompositionApi.Ref<UserAssignedTicketsQueryVariables>
    | ReactiveFunction<UserAssignedTicketsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserAssignedTicketsQuery, UserAssignedTicketsQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<UserAssignedTicketsQuery, UserAssignedTicketsQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<UserAssignedTicketsQuery, UserAssignedTicketsQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<UserAssignedTicketsQuery, UserAssignedTicketsQueryVariables>(
    UserAssignedTicketsDocument,
    variables,
    options,
  )
}
export type UserAssignedTicketsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  UserAssignedTicketsQuery,
  UserAssignedTicketsQueryVariables
>
export const TicketStatusesDocument = gql`
  query TicketStatuses {
    ticketStatuses {
      id
      order
      createdAt
      updatedAt
    }
  }
`

/**
 * __useTicketStatusesQuery__
 *
 * To run a query within a Vue component, call `useTicketStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketStatusesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTicketStatusesQuery();
 */
export function useTicketStatusesQuery(
  options:
    | VueApolloComposable.UseQueryOptions<TicketStatusesQuery, TicketStatusesQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TicketStatusesQuery, TicketStatusesQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TicketStatusesQuery, TicketStatusesQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<TicketStatusesQuery, TicketStatusesQueryVariables>(
    TicketStatusesDocument,
    {},
    options,
  )
}
export function useTicketStatusesLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<TicketStatusesQuery, TicketStatusesQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TicketStatusesQuery, TicketStatusesQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TicketStatusesQuery, TicketStatusesQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<TicketStatusesQuery, TicketStatusesQueryVariables>(
    TicketStatusesDocument,
    {},
    options,
  )
}
export type TicketStatusesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  TicketStatusesQuery,
  TicketStatusesQueryVariables
>
export const TicketStatusBaseDocument = gql`
  query TicketStatusBase($ticketStatusId: ID!) {
    ticketStatus(id: $ticketStatusId) {
      id
      name
      createdAt
      updatedAt
      colorBase {
        hue
        saturation
      }
    }
  }
`

/**
 * __useTicketStatusBaseQuery__
 *
 * To run a query within a Vue component, call `useTicketStatusBaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketStatusBaseQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTicketStatusBaseQuery({
 *   ticketStatusId: // value for 'ticketStatusId'
 * });
 */
export function useTicketStatusBaseQuery(
  variables:
    | TicketStatusBaseQueryVariables
    | VueCompositionApi.Ref<TicketStatusBaseQueryVariables>
    | ReactiveFunction<TicketStatusBaseQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TicketStatusBaseQuery, TicketStatusBaseQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TicketStatusBaseQuery, TicketStatusBaseQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TicketStatusBaseQuery, TicketStatusBaseQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<TicketStatusBaseQuery, TicketStatusBaseQueryVariables>(
    TicketStatusBaseDocument,
    variables,
    options,
  )
}
export function useTicketStatusBaseLazyQuery(
  variables:
    | TicketStatusBaseQueryVariables
    | VueCompositionApi.Ref<TicketStatusBaseQueryVariables>
    | ReactiveFunction<TicketStatusBaseQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TicketStatusBaseQuery, TicketStatusBaseQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TicketStatusBaseQuery, TicketStatusBaseQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TicketStatusBaseQuery, TicketStatusBaseQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<TicketStatusBaseQuery, TicketStatusBaseQueryVariables>(
    TicketStatusBaseDocument,
    variables,
    options,
  )
}
export type TicketStatusBaseQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  TicketStatusBaseQuery,
  TicketStatusBaseQueryVariables
>
export const AuthenticateDocument = gql`
  mutation Authenticate($username: String!) {
    authenticate(username: $username) {
      token
    }
  }
`

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAuthenticateMutation({
 *   variables: {
 *     username: // value for 'username'
 *   },
 * });
 */
export function useAuthenticateMutation(
  options:
    | VueApolloComposable.UseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>
      > = {},
) {
  return VueApolloComposable.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(
    AuthenticateDocument,
    options,
  )
}
export type AuthenticateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  AuthenticateMutation,
  AuthenticateMutationVariables
>
export const UpdateDisplayNameDocument = gql`
  mutation UpdateDisplayName($displayName: String!) {
    updateDisplayName(displayName: $displayName) {
      token
    }
  }
`

/**
 * __useUpdateDisplayNameMutation__
 *
 * To run a mutation, you first call `useUpdateDisplayNameMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDisplayNameMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateDisplayNameMutation({
 *   variables: {
 *     displayName: // value for 'displayName'
 *   },
 * });
 */
export function useUpdateDisplayNameMutation(
  options:
    | VueApolloComposable.UseMutationOptions<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>
      > = {},
) {
  return VueApolloComposable.useMutation<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>(
    UpdateDisplayNameDocument,
    options,
  )
}
export type UpdateDisplayNameMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  UpdateDisplayNameMutation,
  UpdateDisplayNameMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      username
      displayName
      createdAt
      updatedAt
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options)
}
export function useMeLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options)
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>
export const UserDocument = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
      displayName
      createdAt
      updatedAt
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a Vue component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useUserQuery(
  variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options)
}
export function useUserLazyQuery(
  variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options)
}
export type UserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserQuery, UserQueryVariables>
