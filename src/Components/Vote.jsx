import React from 'react'

const Vote = (props) => {
  return (
    <div className="voting-container" > 
        <h2 className='header'>Metamask is connected</h2>
        <p className='account'>Metamask Account: {props.account}</p>
        {/* <p className="connected-account">Remaining Time: {props.remainingTime}</p> */}
        {props.showButton ? (
            <p>You have already voted!</p>
        ) : (
            <div>
            <input type="number" placeholder="Enter Candidate Index" value={props.number} onChange={props.handleNumberChange}></input>
            <br />
            <br />
            <button className="vote-button" onClick={props.voteFunction}>Vote</button>

        </div>
        )}
        <br />
        <table id="myTable" className="candidates-table">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                </tr>
                </thead>
                <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.index}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>

    </div>
  )
}

export default Vote