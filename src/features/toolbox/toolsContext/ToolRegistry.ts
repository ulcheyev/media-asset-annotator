import {Constants} from '../../../utils/Constants';
import {FreehandDrawTool} from './FreehandDrawTool';
import type {ToolContextInterface, ToolStrategy} from './ToolContextInterface';
import {TextDrawTool} from "./TextDrawTool.ts";

export class ToolRegistry {
    private readonly tools = new Map<string, ToolStrategy | null>();
    private readonly ctx: ToolContextInterface;
    constructor(ctx: ToolContextInterface) {
        this.ctx = ctx;
        this.tools.set(Constants.SELECT_TOOL_LABEL, null);
        this.tools.set(Constants.DRAW_TOOL_LABEL, new FreehandDrawTool());
        this.tools.set(Constants.TEXT_TOOL_LABEL, new TextDrawTool())
    }

    get(toolId: string): ToolStrategy | null {
        return this.tools.get(toolId) ?? null;
    }

    resetAll() {
        for (const tool of this.tools.values()) {
            tool?.cancel?.(this.ctx);
        }
    }
}
