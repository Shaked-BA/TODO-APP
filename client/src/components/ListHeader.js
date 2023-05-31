function ListHeader({ listName, handleClick, removeFromCookie }) {

  const signout = () => {
    removeFromCookie("Email");
    removeFromCookie("Token");
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => handleClick({mode: 'create', data: {}})}>Add New</button>
        <button className="signout" onClick={signout}>Sign Out</button>
      </div>
    </div>
  );
}
  
export default ListHeader;