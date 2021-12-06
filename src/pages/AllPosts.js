import React from "react"
import post from "../components/post"

const AllPosts = (props) => {
    // for each post in the array, render a post component

    return props.posts.map((post) => {
        return <post key={post.id} post={post}/>

    })
}

export default AllPosts;