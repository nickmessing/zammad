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

export type MeQuery = { __typename?: 'Query'; me?: { __typename?: 'User'; id: string; username: string } | null }

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UserQuery = {
  __typename?: 'Query'
  user?: { __typename?: 'User'; id: string; username: string; displayName: string } | null
}

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
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      displayName
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
 *   id: // value for 'id'
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
