function EditWatchList() {
  return (
    <>
      <div className="head">
        <p>Edit your watchlist</p>
        <a href="#">Delete Watchlist</a>
      </div>

      <label htmlFor="watchlist-title"> Name</label>
      <input type="text" name="watchlist-title" />
      <label htmlFor="watchlist-description"> Description</label>
      <input type="text" name="watchlist-description" className="description" />
    </>
  );
}

export default EditWatchList;
