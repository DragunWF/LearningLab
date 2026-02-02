import Counter from "./Counter";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      {/* <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      /> */}

      <div>
        <Counter>
          <Counter.Label>My super flexible counter by DragunWF</Counter.Label>
          <Counter.Increase icon="+" />
          <Counter.Count />
          <Counter.Decrease icon="-" />
        </Counter>
      </div>

      <div>
        <Counter>
          <Counter.Increase icon="+" />
          <div>
            <Counter.Count />
          </div>
          <Counter.Decrease icon="-" />
          <Counter.Label>My super flexible counter by DragunWF</Counter.Label>
        </Counter>
      </div>
    </div>
  );
}
