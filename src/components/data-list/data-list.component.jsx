import React from 'react';

export const DataList = props => {
    return props.datalist.map((dta, index) => {
        const { title, url, author, created_at, created_at_i } = dta //destructuring
        return (
        <tr key={created_at_i}>
            <td>{title}</td>
            <td>{url}</td>
            <td>{author}</td>
            <td>{created_at}</td>
        </tr>
        )
    })
}