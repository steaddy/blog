import React, {useState} from "react";
import classes from "./NewArticle.module.css";
import {useNavigate} from "react-router-dom";
import {v4} from 'uuid';
import {useFieldArray, useForm} from "react-hook-form";

const NewArticle = () => {
    /*
        const [tags, setTags] = useState([]);
    */

    const {
        register,
        control,
        reset,
        formState: {
            errors,
            isValid,
        },
        handleSubmit
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            tags: [{name: ""},]
        }
    });


    console.log("Errors: ", errors?.tags);

    const {fields, append, remove,} = useFieldArray( {
        name: 'tags',
        control,
    });


    const onSubmit =  async (data, e) => {
        e.preventDefault();
        if(!isValid) return;
        console.log(JSON.parse(localStorage.getItem('user')).token)
        console.log(data.tags);
        const tagList = data.tags.map(item => (
            item.name
        ))
        const payload = {
            article: {
                title: data.title,
                description: data.description,
                body: data['article-text'],
                tagList: tagList,
            }
        }
        console.log(JSON.stringify(payload))

        try {
            const res = await fetch('https://blog.kata.academy/api/articles', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            })

            const resData = await res.json();
            console.log(data);
        } catch (e) {
            console.log(e.message)
        }


/*
        console.log(errors);
*/
/*
        reset();
*/
        /*
                setTags([]);
        */
    };

    /*

        const addTagHandler = (e) => {
            e.preventDefault();
            const tagInput = document.getElementById('tag-input');
            setTags(
                 [...tags, <TagItem
                tag={tagInput.value}
                id={v4()}
                key={v4()}
                deleteTag={deleteTag}
            />]);
            tagInput.value = null;
        };

        const deleteTag = (id) => {
            console.log(id);
            console.log(tags);
        };
    */


    return (
        <div className={classes['article-wrapper']}>
            <div className={classes['article']}>
                <h1>Create New Article</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes['input-block']}>
                        <label htmlFor="title" className={classes['form-label']}>Title</label>
                        <input

                            {...register('title', {
                                required: 'Here should be a title',
                                minLength: {
                                    value: 3,
                                    message: 'Name should be longer than 3 characters'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Name should be shorter than 20 characters'
                                }
                            })}
                        />

                        <div>
                            <p className={classes['input-error']}>
                                {errors['title'] && errors['title']?.message}
                            </p>
                        </div>
                    </div>

                    <div className={classes['input-block']}>
                        <label htmlFor="title" className={classes['form-label']}>Short Description</label>
                        <input

                            {...register('description', {
                                required: 'Here should be a short description',
                                minLength: {
                                    value: 3,
                                    message: 'Description should be longer than 3 characters'
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Name should be shorter than 30 characters'
                                }
                            })}
                            id='description'
                            type="text"
                            placeholder='Short Description' className={classes['form-input']}
                        />

                        <div>
                            <p className={classes['input-error']}>
                                {errors['description'] && errors['description']?.message}
                            </p>
                        </div>
                    </div>

                    <div className={classes['input-block']}>
                        <label htmlFor="title" className={classes['form-label']}>Text</label>
                        <textarea

                            {...register('article-text', {
                                required: 'Here should be the text of your article',
                                minLength: {
                                    value: 10,
                                    message: 'Article should be longer than 10 characters'
                                },
                                maxLength: {
                                    value: 3000,
                                    message: 'Article should be shorter than 3000 characters'
                                }
                            })}
                            id={classes['article-text']}
                            placeholder='Text'
                            className={classes['form-input']}
                        />

                        <div>
                            <p className={classes['input-error']}>
                                {errors['article-text'] && errors['article-text']?.message}
                            </p>
                        </div>





                        <label className={classes["tag-block-label"]}>Tags</label>


                        <p>{errors['tags']?.message}</p>


                        {fields.length === 0 ? 'No tags will be send' : fields.map((item, index) => {
                            return <section key={v4()} className={classes["tag-input-block"]}>
                                <input {...register(`tags.${index}.name`, {
                                    required: "The tag is required",
                                    minLength: {
                                        value: 2,
                                        message: 'Name should be longer than 2 characters'
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: 'Name should be shorter than 15 characters'
                                    }
                                })}
                                       className={classes["tag-input"]}
                                       placeholder='Tag'
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        remove(index);
                                    }}
                                    className={classes["tag-delete-btn"]}
                                >Delete
                                </button>
                                <p
                                    className={classes['input-error']}
                                >{errors.tags && errors.tags[index]?.name?.message}</p>
                            </section>
                        })}


                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                append();
                            }}
                            className={classes["tag-add-btn"]}
                        >Add tag
                        </button>


{/*
                        {tags}

                        <div className={classes["tag-input-block"]}>
                            <input
                                className={classes["tag-input"]}
                                placeholder='Tag'
                                id='tag-input'
                            />
                            <button className={classes["tag-delete-btn"]}>Delete</button>
                            <button
                                onClick={addTagHandler}
                                className={classes["tag-add-btn"]}
                            >Add teg
                            </button>
                        </div>*/}



                    </div>


                    <input
                        className={classes['submit-button']}
                        type='submit'
                        value='Send'

                    />

                </form>
            </div>
        </div>
    );
};

export default NewArticle;