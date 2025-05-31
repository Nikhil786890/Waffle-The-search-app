import React,{useState} from "react";
import SearchIcon from '@mui/icons-material/Search';


const suggestions=[
    "google",
    "SQL",
    "Java",
    "React",
    "Node",
    "MongoDB",
    "PostgreSQL",
    "wikipedia"
]


//onKeyDown senses the keyStroke by the user
function App(){
    //the typedquery here is the data the user has inputted to track the user input
    const [typedQuery,setQuery] =useState("");


    //this hook filters stores the suggestions based on checking withe the user input
    const [filteredSuggestions,setFilteredSuggestions]=useState([]);

    //thsi hook tracks wheteher the user is interacting with the input field or not
    const [userFocusState,isInputFocused]=useState(false);

    function handleChange(event){
       const val =event.target.value;
       setQuery(val);
       isInputFocused(true);
       

    const matches = suggestions.filter(suggestion =>
    suggestion.toLowerCase().startsWith(val.toLowerCase()) ||
    suggestion.toLowerCase().includes(val.toLowerCase()) );

    setFilteredSuggestions(matches);
    }


    
    //here the value for the input field is given as typed query so that it is controlled by the value of the the typed query mean sthat the input=typedquery
    return(
    <div className="outer_box">
    
    <h1>Waffle</h1>

    <div className="search_container">

    <input  onChange={handleChange}  
    //i have already added this effect below ehen an suggestion is clicked but it only gets active when anything is typed,hence to have the effect alwyas when the input field is focused and when not
    onFocus={()=>isInputFocused(true)}
    onBlur={()=>setTimeout(()=>isInputFocused(false),300)}
    
    value={typedQuery} className="search_box" >

     </input>
     {typedQuery.length > 0 && filteredSuggestions.length > 0 && userFocusState && ( 
    //here the if ststement soesnt works we have to use this conditional rendering ,here if the user is typng something and theere is any item insuggestions AND user is Focused on input then only () the ststments in this will render else not.
    <ul>
    {filteredSuggestions.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
    </ul>
     )}

     {typedQuery.trim().length >0 && filteredSuggestions.length > 0  && userFocusState && ( 
    //the trim here hides the suggestion as the suggestions might also get triggred for the white space in the typed query as the both filter and userfocus is active
    <ul>
    {filteredSuggestions.map((item, index) => (
      <li 
      onClick={()=>{
        setQuery(item); // Set the input box to the clicked suggestion
       setTimeout(()=>{setFilteredSuggestions([]); isInputFocused(false);}
       ,300)  // Hide the dropdown,after 300ms of removing focus from the suggestion,as the effects not show up we add isInputFocused also so to mark the input as not focused
      

      }} key={index}>{item}</li>
    ))}
    </ul>
     )}


    <button> <SearchIcon /> </button>
    </div>

    </div>
    );
}

export default App;