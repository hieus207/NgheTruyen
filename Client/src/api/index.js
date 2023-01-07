import axios from 'axios'
import { URL } from '../constants'
export const api = {
    call : () => {
        return axios.create({baseURL: URL})
    }
}

export * from "./TellerApi"
export * from "./AuthorApi"
export * from "./CategoryApi"
export * from "./StoryApi"
export * from "./CommentApi"
export * from "./AuthApi"

