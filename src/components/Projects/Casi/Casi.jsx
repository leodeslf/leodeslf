import { useEffect, useState } from 'react';

const charLimit = 10;

export default function Casi() {
  const [answer, setAnswer] = useState(0);
  const [input, setInput] = useState('0');
  const [inputRecord, setInputRecord] = useState('');
  const [memory, setMemory] = useState(false);
  const [queuedOperation, setQueuedOperation] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const newInputRecord = (memory || '') + symbol + input;
    const characters = newInputRecord.length;
    setInputRecord(characters > charLimit ?
      newInputRecord.slice(characters - charLimit) :
      newInputRecord
    );
  }, [memory, symbol, input]);

  // (2)
  function digit(value) {
    setWaiting(false);
    setInput(value);
  }

  // (add, '+')
  function operate(newOperation, newSymbol) {
    const inputNumber = Number(input);

    // Old operation already in queue. Operate with temporal answer and input.
    if (memory && queuedOperation && !waiting) {
      setMemory(memory.concat(symbol).concat(input));
      queuedOperation(inputNumber, answer); // Add.
    }

    // First time after an input. Enqueue operation and set input as memory.
    if (!queuedOperation) {
      setMemory(String(input)); // Avoid type coercion.
      setAnswer(inputNumber); // Set "temporal" answer.
    }

    setInput('0');
    setWaiting(true);
    setQueuedOperation(() => newOperation);
    setSymbol(newSymbol);
  }

  function add(a, b) {
    setAnswer(a + b);
  }

  return (
    <div id="casi">
      <div className="casi__display">
        <div className="casi__input-record">
          {inputRecord}
        </div>
        <div className="casi__answer">
          {answer}
        </div>
      </div>
      <div className="casi__buttons">
        <span onClick={() => digit(2)}>
          2
        </span>
        <span onClick={() => operate(add, '+')}>
          +
        </span>
      </div>
    </div>
  );
}
