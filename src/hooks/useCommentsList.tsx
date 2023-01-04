import React from 'react';
import Axios from 'axios';

import { useWebsiteUrl } from './useWebsiteUrl';
import { CommentModel } from '../models/Comment';
import Constants from '../components/constants.json';

export const useCommentsList = (): [CommentModel[], () => void] => {
    const [page, setPage] = React.useState(1);
    const website = useWebsiteUrl();
    const [commentsList, setCommentsList] = React.useState<CommentModel[]>([]);

    React.useEffect(() => {
        Axios.get(`${Constants.API_URL}/Comments/${website}/${1}`).then((response) => {
            console.log(response);
            setCommentsList(response.data)
        })
    }, [website])

    React.useDebugValue(commentsList ?? 'Loading...');

    const loadMoreComments = React.useCallback(() => {
        Axios.get(`${Constants.API_URL}/Comments/${website}/${page+1}`).then((response) => {
            const newComments: CommentModel[] = response.data;
            setCommentsList([...commentsList, ...newComments]);
            setPage((page) => page + 1);
        })
    },[commentsList, page, website])

    return [commentsList, loadMoreComments];
}