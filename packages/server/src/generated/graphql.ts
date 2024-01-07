/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
import type { TicketComment as MappedTicketComment } from '../../db/schema/ticketComments'
import type { Ticket as MappedTicket } from '../../db/schema/tickets'
import type { TicketStatus as MappedTicketStatus } from '../../db/schema/ticketStatuses'
import type { User as MappedUser } from '../../db/schema/users'
import type { ApolloContext } from '../types/apollo'
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | undefined
export type InputMaybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticationResponse: ResolverTypeWrapper<MappedUser>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  ColorBase: ResolverTypeWrapper<ColorBase>
  ColorBaseInput: ColorBaseInput
  CreateTicketCommentInput: CreateTicketCommentInput
  CreateTicketInput: CreateTicketInput
  CreateTicketStatusInput: CreateTicketStatusInput
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>
  ID: ResolverTypeWrapper<Scalars['ID']['output']>
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']['output']>
  Ticket: ResolverTypeWrapper<MappedTicket>
  TicketComment: ResolverTypeWrapper<MappedTicketComment>
  TicketCommentConnection: ResolverTypeWrapper<
    Omit<TicketCommentConnection, 'items'> & { items: Array<ResolversTypes['TicketComment']> }
  >
  TicketCommentMutation: ResolverTypeWrapper<MappedTicketComment>
  TicketConnection: ResolverTypeWrapper<Omit<TicketConnection, 'items'> & { items: Array<ResolversTypes['Ticket']> }>
  TicketMutation: ResolverTypeWrapper<MappedTicket>
  TicketStatus: ResolverTypeWrapper<MappedTicketStatus>
  TicketStatusMutation: ResolverTypeWrapper<MappedTicketStatus>
  UpdateTicketInput: UpdateTicketInput
  UpdateTicketStatusInput: UpdateTicketStatusInput
  User: ResolverTypeWrapper<MappedUser>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticationResponse: MappedUser
  Boolean: Scalars['Boolean']['output']
  ColorBase: ColorBase
  ColorBaseInput: ColorBaseInput
  CreateTicketCommentInput: CreateTicketCommentInput
  CreateTicketInput: CreateTicketInput
  CreateTicketStatusInput: CreateTicketStatusInput
  DateTime: Scalars['DateTime']['output']
  ID: Scalars['ID']['output']
  Int: Scalars['Int']['output']
  Mutation: {}
  Query: {}
  String: Scalars['String']['output']
  Ticket: MappedTicket
  TicketComment: MappedTicketComment
  TicketCommentConnection: Omit<TicketCommentConnection, 'items'> & {
    items: Array<ResolversParentTypes['TicketComment']>
  }
  TicketCommentMutation: MappedTicketComment
  TicketConnection: Omit<TicketConnection, 'items'> & { items: Array<ResolversParentTypes['Ticket']> }
  TicketMutation: MappedTicket
  TicketStatus: MappedTicketStatus
  TicketStatusMutation: MappedTicketStatus
  UpdateTicketInput: UpdateTicketInput
  UpdateTicketStatusInput: UpdateTicketStatusInput
  User: MappedUser
}

export type AuthenticationResponseResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['AuthenticationResponse'] = ResolversParentTypes['AuthenticationResponse'],
> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ColorBaseResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['ColorBase'] = ResolversParentTypes['ColorBase'],
> = {
  hue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  saturation?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  authenticate?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationAuthenticateArgs, 'username'>
  >
  createTicket?: Resolver<
    ResolversTypes['Ticket'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTicketArgs, 'input'>
  >
  createTicketStatus?: Resolver<
    ResolversTypes['TicketStatus'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTicketStatusArgs, 'input'>
  >
  ticket?: Resolver<ResolversTypes['TicketMutation'], ParentType, ContextType, RequireFields<MutationTicketArgs, 'id'>>
  ticketStatus?: Resolver<
    ResolversTypes['TicketStatusMutation'],
    ParentType,
    ContextType,
    RequireFields<MutationTicketStatusArgs, 'id'>
  >
  updateDisplayName?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDisplayNameArgs, 'displayName'>
  >
}

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  ticket?: Resolver<Maybe<ResolversTypes['Ticket']>, ParentType, ContextType, RequireFields<QueryTicketArgs, 'id'>>
  ticketStatus?: Resolver<
    Maybe<ResolversTypes['TicketStatus']>,
    ParentType,
    ContextType,
    RequireFields<QueryTicketStatusArgs, 'id'>
  >
  ticketStatuses?: Resolver<Array<ResolversTypes['TicketStatus']>, ParentType, ContextType>
  tickets?: Resolver<
    ResolversTypes['TicketConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryTicketsArgs, 'first'>
  >
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
}

export type TicketResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket'],
> = {
  assignee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  comments?: Resolver<
    ResolversTypes['TicketCommentConnection'],
    ParentType,
    ContextType,
    RequireFields<TicketCommentsArgs, 'first'>
  >
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['TicketStatus'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TicketCommentResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['TicketComment'] = ResolversParentTypes['TicketComment'],
> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  ticket?: Resolver<ResolversTypes['Ticket'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TicketCommentConnectionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['TicketCommentConnection'] = ResolversParentTypes['TicketCommentConnection'],
> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  items?: Resolver<Array<ResolversTypes['TicketComment']>, ParentType, ContextType>
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TicketCommentMutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['TicketCommentMutation'] = ResolversParentTypes['TicketCommentMutation'],
> = {
  remove?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  update?: Resolver<
    ResolversTypes['TicketComment'],
    ParentType,
    ContextType,
    RequireFields<TicketCommentMutationUpdateArgs, 'comment'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TicketConnectionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['TicketConnection'] = ResolversParentTypes['TicketConnection'],
> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  items?: Resolver<Array<ResolversTypes['Ticket']>, ParentType, ContextType>
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TicketMutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['TicketMutation'] = ResolversParentTypes['TicketMutation'],
> = {
  comment?: Resolver<
    ResolversTypes['TicketCommentMutation'],
    ParentType,
    ContextType,
    RequireFields<TicketMutationCommentArgs, 'id'>
  >
  createComment?: Resolver<
    ResolversTypes['TicketComment'],
    ParentType,
    ContextType,
    RequireFields<TicketMutationCreateCommentArgs, 'input'>
  >
  remove?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  update?: Resolver<ResolversTypes['Ticket'], ParentType, ContextType, RequireFields<TicketMutationUpdateArgs, 'input'>>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TicketStatusResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['TicketStatus'] = ResolversParentTypes['TicketStatus'],
> = {
  colorBase?: Resolver<ResolversTypes['ColorBase'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  tickets?: Resolver<
    ResolversTypes['TicketConnection'],
    ParentType,
    ContextType,
    RequireFields<TicketStatusTicketsArgs, 'first'>
  >
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TicketStatusMutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['TicketStatusMutation'] = ResolversParentTypes['TicketStatusMutation'],
> = {
  remove?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  update?: Resolver<
    ResolversTypes['TicketStatus'],
    ParentType,
    ContextType,
    RequireFields<TicketStatusMutationUpdateArgs, 'input'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  assignedTickets?: Resolver<
    ResolversTypes['TicketConnection'],
    ParentType,
    ContextType,
    RequireFields<UserAssignedTicketsArgs, 'first'>
  >
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  createdTickets?: Resolver<
    ResolversTypes['TicketConnection'],
    ParentType,
    ContextType,
    RequireFields<UserCreatedTicketsArgs, 'first'>
  >
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = ApolloContext> = {
  AuthenticationResponse?: AuthenticationResponseResolvers<ContextType>
  ColorBase?: ColorBaseResolvers<ContextType>
  DateTime?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Ticket?: TicketResolvers<ContextType>
  TicketComment?: TicketCommentResolvers<ContextType>
  TicketCommentConnection?: TicketCommentConnectionResolvers<ContextType>
  TicketCommentMutation?: TicketCommentMutationResolvers<ContextType>
  TicketConnection?: TicketConnectionResolvers<ContextType>
  TicketMutation?: TicketMutationResolvers<ContextType>
  TicketStatus?: TicketStatusResolvers<ContextType>
  TicketStatusMutation?: TicketStatusMutationResolvers<ContextType>
  User?: UserResolvers<ContextType>
}
