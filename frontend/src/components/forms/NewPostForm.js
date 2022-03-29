const NewPost = () => {
  return (
    <div>
      <h1>Add new post</h1>
      <form>
        <input type="file" name="post-img" accept="image/*" />
        <input type="text" />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default NewPost;
