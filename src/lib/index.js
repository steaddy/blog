import {useSelector} from "react-redux";


export const likesQuery = async (slug, favorited) => {
    try {
        const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
            method: favorited ? 'DELETE' : 'POST',
            body: JSON.stringify({slug: slug}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        });
        return res.ok
    } catch (e) {
        console.log(e.message);
    }
};
/*

export const deleteArticleQuery = async (slug) => {




    const token = useSelector(state => auth.user?.token)
    console.log(token);




    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        body: JSON.stringify({slug: slug}),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    });
    return res;
}*/
