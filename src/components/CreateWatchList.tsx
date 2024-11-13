function CreateWatchList() {
  return (
    <>
      <form>
        <p>Create a new Watchlist</p>
        <label htmlFor="movie-title"> Name</label>
        <input type="text" name="movie-title" />
        <input type="text" />
      </form>
    </>
  );
}

export default CreateWatchList;
