import React from 'react';

function Pagination(props){
    let pages = []

    for(let i=1; i<=props.pages; i++)
    {
        pages.push(i)
        
    }

    return(
        
        <nav>
            <ul className="pagination">
                { pages.map(ele => (
                    <li key={ele} className="page-item">
                        <a className="page-link bg-info" onClick={() => props.handleClick(ele)}>
                            {ele}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination