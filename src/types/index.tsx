export interface GetData {
  id: string
  title: string | null
  isCompleted: boolean
}

export interface StyleDeleteSelected {
  border: string
  backgroundColor: string
  color: string
  width: string
  height: string
  cursor: string
  '&:hover': {
    backgroundColor: string
    color: string
  }
}

export interface StyleAddTodo {
  backgroundColor: string
  border: string
  padding: string
  borderBottomRightRadius: string
  borderTopRightRadius: string
  cursor: string
}

export interface StyleChangeStatus {
  backgroundColor: string
  cursor: string
  textAlign: string
  height: string
  width: string
  borderColor: string
  borderRight: string
}

export interface StyleDeleteTodo {
  color: string
  backgroundColor: string
  border: string
  borderBottomRightRadius: string
  borderTopRightRadius: string
  borderTopLeftRadius: string
  textAlign: string
  height: string
  width: string
  cursor: string
}
