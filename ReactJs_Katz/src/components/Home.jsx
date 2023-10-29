import React, { useEffect, useState } from 'react'
import DetailCard from './DetailCard'
import cross from '../assets/x-button.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
  const [allData, setAllData] = useState([])
  const [editorActive, setEditorActive] = useState(false)
  const [editingItem, setEditingItem] = useState({
    name: "",
    country: "",
    web_pages: [
      ""
    ]
  });
  const [newEntry, setNewEntry] = useState({
    name: "",
    country: "",
    web_pages: [
      ""
    ]
  });
  const [deletingItem, setDeletingItem] = useState()
  const [deletionActive, setDeletionActive] = useState(false)
  const [activePage, setActivePage] = useState(0);
  const [pagingStart, setPagingStart] = useState(0);
  const [pagingEnd, setPagingEnd] = useState(10);
  const [newEntryPopUp, setNewEntryPopUp] = useState(false)
  const [sortOrder, setSortOrder] = useState("asc")
  useEffect(() => {

    fetch('http://universities.hipolabs.com/search?country=United+States').then(res => res.json()).then(json => {

      setAllData(json.sort((a, b) => a.name.localeCompare(b.name)))
    })
  }, [])

  useEffect(() => {
    let start = activePage * 10
    setPagingStart(start)
    setPagingEnd(start + 10)
  }, [activePage]);


  function showData() {

    return (allData.slice(pagingStart, pagingEnd).map((item, i) => {
      return (<DetailCard item={item} id={i} popFunction={deleteThisItem} editFunction={editThisItem} key={i} />)
    }))
  }

  function popIt(id) {
    let array = [...allData]
    if (id >= 0 && id < allData.length) {
      array.splice(pagingStart + id, 1);
      setAllData(array)
      notify("Deleted")
    } else {
      console.log("Index is out of bounds.");
    }
    setDeletionActive(false)
  }

  function deleteThisItem(id) {
    setDeletingItem(id);
    setDeletionActive(true)
  }

  function validate(item) {
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    const alphaWithSpacePattern = /^[A-Za-z\s]+$/;
    if (item.name.length < 5) {
      return "Enter Atleast 5 characters in university name"
    } else if (item.country.length < 3) {
      return "Enter Atleast 3 characters in country name"
    }else if (!alphaWithSpacePattern.test(item.country)) {
      return "Enter only alphabets in country name"
    } else if (!urlRegex.test(item.web_pages[0])) {
      return "Enter a valid Website address"
    } else {
      return true
    }
  }

  function editThisItem(id) {
    let tempObj = { ...allData[id] }
    tempObj.id = id
    setEditingItem(tempObj)
    setEditorActive(!editorActive)
  }

  async function submitEntry() {
    try {
      let valid = await validate(newEntry);
      console.log(valid);
      if (valid === true) {
        let tempArray = [newEntry, ...allData]
        setAllData(tempArray)
        setNewEntryPopUp(false)
        setNewEntry({
          name: "",
          country: "",
          web_pages: [
            ""
          ]
        })
        notify("New entry added")
      } else {
        notify(valid);
      }
    } catch (error) {
      notify(error);
      // Handle the validation error (e.g., display an error message to the user).
    }

  }

  function editorChangeHandler(e, type) {
    if (type == "Edit") {
      let tempObj = { ...editingItem }
      if (e.target.name == "uName") {
        tempObj.name = e.target.value
      } else if (e.target.name == "country") {
        tempObj.country = e.target.value
      } else if (e.target.name == "web") {
        tempObj.web_pages[0] = e.target.value
      }
      setEditingItem(tempObj)
    } else if (type == "New_Entry") {
      let tempObj = { ...newEntry }
      if (e.target.name == "uName") {
        tempObj.name = e.target.value
      } else if (e.target.name == "country") {
        tempObj.country = e.target.value
      } else if (e.target.name == "web") {
        tempObj.web_pages[0] = e.target.value
      }
      setNewEntry(tempObj)
    }


  }

  async function submitChanges() {
    try {
      let valid = await validate(editingItem);
      console.log(valid);
      if (valid === true) {
        let tempArray = [...allData];
        let newItem = { ...editingItem };
        delete newItem["id"];
        tempArray[editingItem.id] = newItem;
        setAllData(tempArray);
        setEditorActive(false);
        setEditingItem({
          name: "",
          country: "",
          web_pages: [""]
        });
        notify("Saved");
      } else {
        notify(valid);
      }
    } catch (error) {
      notify(error);
      // Handle the validation error (e.g., display an error message to the user).
    }
  }

  function sortName() {

    if (sortOrder == "asc") {

      allData.sort((a, b) => b.name.localeCompare(a.name));
      setSortOrder("dsc")
    } else {
      allData.sort((a, b) => a.name.localeCompare(b.name));
      setSortOrder("asc")
    }



  }
  const notify = (msg) => toast(msg);


  // return (
  //   <div id='Home'>
  //     <div className="box">
  //       <div>{count}</div>
  //       <div className="buttons">
  //         <div className="increment"><button className="increase" onClick={() => dispatch(increment())} id="increase">+</button></div>
  //         <div className="decrement"><button className="decrease" onClick={() => dispatch(decrement())} id="decrease">-</button></div>
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div id='Home'>
      <ToastContainer position="bottom-left" />
      <div className='topOptions'>
        <button onClick={() => setNewEntryPopUp(true)}>New Entry</button>
      </div>
      {allData.length > 0 ?
        <div className="container">
          <div className="headings">
            <div className="head">
              <h4>University Name</h4>
              <p onClick={sortName}>
                {sortOrder == 'asc' ? "⬇" : "⬆"}
              </p>
            </div>
            <div className="head"><h4>Country Name</h4></div>
            <div className="head"><h4>Website Address</h4></div>
            <div className="head"><h4>Options</h4></div>
          </div>
          <div className="tableContents">
            {showData()}
          </div>
          <div className="pagination">
            <span className='prev' onClick={() => activePage !== 0 && setActivePage((prev) => prev - 1)}>⬅</span>
            <span className='pages'>
              {
                Array(Math.ceil(allData.length / 10)).fill().map((_, i) => {
                  return (i < activePage + 3 && i > activePage - 3) && <span className={i === activePage ? 'active' : ''} onClick={() => setActivePage(i)} key={i}>{i + 1}</span>
                })}

            </span>
            <span className='next' onClick={() => activePage !== Math.ceil(allData.length / 10) && setActivePage((prev) => prev + 1)}>➡</span>
          </div>
        </div>
        : <div>Loading</div>}

      <div className='Editor' style={{ display: editorActive ? "flex" : "none" }}>
        <div className="Container">
          <div className="topPart">
            <div className="title">
              <h4>Edit Details</h4>
            </div>
            <div className="cross">
              <img onClick={() => setEditorActive(false)} src={cross} alt="Close" />
            </div>
          </div>

          {editingItem ?

            <div className="allFields">
              <div className="fields">
                <div className="name">
                  <p>University Name:</p> </div>
                <div className="input">
                  <input name='uName' onChange={(e) => editorChangeHandler(e, "Edit")} value={editingItem.name} type="text" />
                </div>
              </div>
              <div className="fields">
                <div className="name">
                  <p>Country Name:</p>
                </div>
                <div className="input">
                  <input name='country' onChange={(e) => editorChangeHandler(e, "Edit")} value={editingItem.country} type="text" />
                </div>
              </div>
              <div className="fields">
                <div className="name">
                  <p>Website Address:</p>

                </div>
                <div className="input">
                  <input name='web' onChange={(e) => editorChangeHandler(e, "Edit")} value={editingItem?.web_pages[0]} type="text" />
                </div>
              </div>
              <div className="fields">
                <button onClick={submitChanges}>Save</button>
              </div>
            </div>
            :
            <div>Loading</div>}

        </div>
      </div>

      <div className='Editor' style={{ display: deletionActive ? "flex" : "none" }}>
        <div className="deleteContainer">
          <div className='top'>
            <div className="cross">
              <img onClick={() => setDeletionActive(false)} src={cross} alt="Close" />
            </div>
          </div>
          <div className="msgContainer">
            <div className="middle">
              <p>Delete this item?</p>
            </div>
            <div className="bottom">
              <button className='yes' onClick={() => popIt(deletingItem)}>Confirm</button>
              <button className='no' onClick={() => setDeletionActive(false)}>Cancel</button>
            </div>
          </div>

        </div>
      </div>

      <div className='Editor' style={{ display: newEntryPopUp ? "flex" : "none" }}>
        <div className="Container">
          <div className="topPart">
            <div className="title">
              <h4>New Entry</h4>
            </div>
            <div className="cross">
              <img onClick={() => setNewEntryPopUp(false)} src={cross} alt="Close" />
            </div>
          </div>

          <div className="allFields">
            <div className="fields">
              <div className="name">
                <p>University Name:</p> </div>
              <div className="input">
                <input name='uName' onChange={(e) => editorChangeHandler(e, "New_Entry")} value={newEntry.name} type="text" />
              </div>
            </div>
            <div className="fields">
              <div className="name">
                <p>Country Name:</p>
              </div>
              <div className="input">
                <input name='country' onChange={(e) => editorChangeHandler(e, "New_Entry")} value={newEntry.country} type="text" />
              </div>
            </div>
            <div className="fields">
              <div className="name">
                <p>Website Address:</p>

              </div>
              <div className="input">
                <input name='web' onChange={(e) => editorChangeHandler(e, "New_Entry")} value={newEntry?.web_pages[0]} type="text" />
              </div>
            </div>
            <div className="fields">
              <button onClick={submitEntry}>Save</button>
            </div>
          </div>


        </div>
      </div>



    </div>
  )
}

export default Home
