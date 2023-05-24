import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Circle } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { all } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const myCircle = createRef<Circle>();

  view.add(
    <Circle
      ref={myCircle}
      // try changing these properties:
      x={-300}
      width={140}
      height={140}
      fill="#f7768e"
    />
  );

  yield* all(
    myCircle().position.x(300, 1).to(-300, 1),
    myCircle().fill("#e0af68", 1).to("#f7768e", 1)
  );
});
