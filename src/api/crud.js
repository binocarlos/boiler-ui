const List = (query) => {
  return {
    method: 'get',
    url: '',
    params: (query.params || {}).qs || {}
  }
}

const Get = (query) => {
  return {
    method: 'get',
    url: '/' + query.params.id,
    params: (query.params || {}).qs || {}
  }
}


const Post = (query) => {
  return {
    method: 'post',
    url: '',
    data: query.data
  }
}

const Put = (query) => {
  return {
    method: 'put',
    url: '/' + query.params.id,
    data: query.data
  }
}

const SingleDelete = (id, query) => {
  return {
    method: 'delete',
    url: '/' + id
  }
}

// this always yields an array of requests
const Delete = (query) => { 
  return query.params.ids ?
    query.params.ids.map(SingleDelete) :
    [SingleDelete(query.params.id)]
}

const crud = {
  list: List,
  get: Get,
  post: Post,
  put: Put,
  delete: Delete
}

export default crud