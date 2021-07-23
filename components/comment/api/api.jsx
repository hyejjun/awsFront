/*
    비동기통신에 대한 내용을 넣는공간
*/

export const getComment = async (dispatch) => {
    dispatch({type:'GET_COMMENT'})
    try{
        const response = await fetch('http://api.hyejun.co.kr/api/comment')
        const data = await response.json()

        const result = data.map(obj=>{
            return {...obj, date : obj.updatedAt.substr(0,10)}
        })
        
        dispatch({type:'GET_COMMENT_SUCCESS',payload:result})
    } catch (e) {
        dispatch({ type:'GET_COMMENT_ERROR',payload:e })
    }
}
// 댓글 작성
export const postComment = async (dispatch, body) => {
    dispatch({type : 'POST_COMMENT'})
    try {
        //fetch 문이 필요
        // url: string , option : object
        // request method - POST 
        const options = {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json;charset=utf-8'
            },
            body : JSON.stringify(body)
            // body는 무조건 string 형태로
        }
        const response = await fetch('http://api.hyejun.co.kr/api/comment', options)             
        // 얘의 return 값은 Promise 객체 then or async await 로 받아야함

        const data = await response.json()
        const result = {...data, date : data.updatedAt.substr(0,10)}

        dispatch({type : 'POST_COMMENT_SUCCESS', payload : result})
    } catch (e) {
        dispatch({type : 'POST_COMMENT_ERROR'})
    }
}
// 댓글 수정
export const patchComment = async (dispatch) => {

}
// 댓글 삭제
export const deleteComment = async (dispatch) => {

}