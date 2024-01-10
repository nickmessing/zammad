type Maybe<T> = T | null | undefined
type Definitely<T> = Exclude<T, null | undefined>

export type NullableKeys<T> = {
  [Key in keyof T]: undefined extends T[Key] ? Key : never
}[keyof T]

export type NonNullableKeys<T> = Exclude<keyof T, NullableKeys<T>>

export type Optionize<T> = {
  [Key in NullableKeys<T>]?: T[Key] | undefined
} & {
  [Key in NonNullableKeys<T>]: T[Key]
}

export type GraphqlModel = {
  __typename?: string
}

export type GraphqlModelPicker<Model extends GraphqlModel> = {
  [Key in keyof Model]?: Model[Key] extends Maybe<GraphqlModel>
    ? GraphqlModelPicker<Definitely<Model[Key]>>
    : Model[Key] extends GraphqlModel[]
      ? GraphqlModelPicker<Model[Key][number]>
      : true
}

export type ApolloPick<Model extends GraphqlModel, Picker extends GraphqlModelPicker<Model>> = Optionize<{
  [Key in keyof Picker]: Key extends keyof Model
    ? Picker[Key] extends true
      ? Model[Key]
      : Model[Key] extends GraphqlModel
        ? Picker[Key] extends GraphqlModelPicker<Model[Key]>
          ? ApolloPick<Model[Key], Picker[Key]>
          : never
        : Model[Key] extends Maybe<GraphqlModel>
          ? Picker[Key] extends GraphqlModelPicker<Definitely<Model[Key]>>
            ? Maybe<ApolloPick<Definitely<Model[Key]>, Picker[Key]>>
            : never
          : Model[Key] extends GraphqlModel[]
            ? Picker[Key] extends GraphqlModelPicker<Model[Key][number]>
              ? ApolloPick<Model[Key][number], Picker[Key]>[]
              : never
            : never
    : never
}> &
  Pick<Model, ('id' | '__typename') & keyof Model>
