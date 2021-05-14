import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component ", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="It-cam" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("It-cam");
    });
    test("After creation <span> should BE", () => {
        const component = create(<ProfileStatus status="It-cam" />);
        const root = component.root;
        let span=root.findByType("span");
        expect(span.children[0].length).toBe(6);
    });
    test("<Input> should BE displayd in editMode instead of span", () => {
        const component = create(<ProfileStatus status="It-cam" />);
        const root = component.root;
        let span=root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("It-cam");
    });
});