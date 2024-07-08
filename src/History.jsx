import "./History.css";

// eslint-disable-next-line react/prop-types
const History = ({ history, showHistory, onDeleteHistory }) => {
  return (
    <div className={`history-panel ${showHistory ? "show" : ""}`}>
      <h2 className="heading">History</h2>
      <div className="history">
        {history.map((entry, index) => (
          <div key={index} className="history-entry">
            <div>
              {entry.expression} = {entry.result}
            </div>
          </div>
        ))}
      </div>
      <button className="delete-history" onClick={onDeleteHistory}>
        Clear History
      </button>
    </div>
  );
};

export default History;
