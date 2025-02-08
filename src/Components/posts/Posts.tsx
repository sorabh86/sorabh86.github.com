import React from 'react'

export default function Posts({posts}) {

  return (
    <div className='posts text-secondary row'>
        {/* JSON.stringify(posts) */}
        {posts.map((post,index) => {
            return <div key={index} className='col-xl-4 p-3 post-item' data-id={post.id}>
                <div className="alert alert-primary h-100 d-flex flex-column">
                    <h2 className='post-title text-center'>{post.title}</h2>
                    <div className='post-content'>{post.content}</div>
                    <div className="date badge bg-primary mt-auto"><i>{post.created}</i></div>
                </div>
            </div>
      })}
    </div>
  )
}
