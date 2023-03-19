import { useLayoutEffect, useRef, useState } from "react";

const DynamicInput = () => {
  const [boxes, setBoxes] = useState([]);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const focusedEl = useRef(null);

  const addBox = () => {
    setBoxes(boxes.concat(""));
    setFocusedIdx(boxes.length);
  };

  const deleteBox = (i) => {
    setBoxes(boxes.slice(0, i).concat(boxes.slice(i + 1)));
    setFocusedIdx(Math.min(i, boxes.length - 2));
  };

  const moveBoxDown = (i) => {
    let newBoxes = [...boxes];
    if (i < newBoxes.length - 1) {
      [newBoxes[i + 1], newBoxes[i]] = [newBoxes[i], newBoxes[i + 1]];
    }

    setFocusedIdx(i < newBoxes.length - 1 ? i + 1 : i);
    setBoxes(newBoxes);
  };

  const moveBoxUp = (i) => {
    let newBoxes = [...boxes];
    if (i) {
      [newBoxes[i - 1], newBoxes[i]] = [newBoxes[i], newBoxes[i - 1]];
    }

    setFocusedIdx(i ? i - 1 : i);
    setBoxes(newBoxes);
  };

  const handleKeyPress = (event, i) => {
    let newBoxes = [...boxes];
    newBoxes[i] = event.target.value;
    setBoxes(newBoxes);
    setFocusedIdx(i);
  };

  useLayoutEffect(() => {
    focusedEl.current !== null && focusedEl.current.focus();
  });

  return (
    <>
      <button data-testid="add-row" className="add-row" onClick={addBox}>
        ＋
      </button>
      {boxes.map((e, i) => (
        <div key={i} tabIndex={i}>
          <input
            className="row-input"
            data-testid="row-input"
            value={e}
            onChange={(event) => handleKeyPress(event, i)}
            ref={i === focusedIdx ? focusedEl : undefined}
          />
          <button
            className="row-up"
            data-testid="row-up"
            onClick={() => moveBoxUp(i)}
          >
            ↑
          </button>
          <button
            className="row-down"
            data-testid="row-down"
            onClick={() => moveBoxDown(i)}
          >
            ↓
          </button>
          <button
            className="row-delete"
            data-testid="row-delete"
            onClick={() => deleteBox(i)}
          >
            ×
          </button>
        </div>
      ))}
    </>
  );
};

export default DynamicInput;
