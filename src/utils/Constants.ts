export class Constants {
  // Media types
  static VIDEO_ASSET_TYPE_LABEL = 'video';
  static IMAGE_ASSET_TYPE_LABEL = 'image';
  static ANNOTATION_MIN_DURATION = 2;
  //Annotation types
  static POLYLINE_TYPE_LABEL = 'polyline';
  static TEXT_TYPE_LABEL = 'text';

  // Tool
  static DEFAULT_SCENE_WIDTH = 960;
  static DEFAULT_SCENE_HEIGHT = 540;
  static SELECT_TOOL_LABEL = 'select';
  static RECT_TOOL_LABEL = 'rect';
  static TEXT_TOOL_LABEL = 'text';
  static DRAW_TOOL_LABEL = 'polyline';
  static POLYGON_TOOL_LABEL = 'polygon';
  static EDIT_COMMAND_LABEL = 'edit';
  static UNDO_COMMAND_LABEL = 'undo';
  static REDO_COMMAND_LABEL = 'redo';
  static DELETE_COMMAND_LABEL = 'delete';
  static SAVE_COMMAND_LABEL = 'save';
  // Text
  static TEXT_DEFAULT_FONT_SIZE = 25;
  static TEXT_DEFAULT_FONT_WEIGHT = 300;
  static TEXT_DEFAULT_COLOR = 'red';
  static TEXT_DEFAULT_STROKE_WIDTH = 1;
  static TEXT_DEFAULT_OPACITY = 1;
  static TEXT_DEFAULT_FILL = 'none';
  static DEFAULT_FONT_FAMILY = 'sans-serif';
  static MIN_FONT_SIZE = 8;
  static MAX_FONT_SIZE = 72;
  static IMAGE_SCALE = 2;

  // Polyline
  static POLYLINE_DEFAULT_COLOR = 'red';
  static POLYLINE_DEFAULT_STROKE_WIDTH = 7;
  static POLYLINE_DEFAULT_OPACITY = 100;
  static POLYLINE_DEFAULT_FILL = 'none';
  static MAX_STROKE_WIDTH = 50;

  // Styles
  static SELECTED_ANNOTATION_BLUR_COLOR = '#0022ff';
  static SELECTED_POLYLINE_ANNOTATION_DASH_PARAMETER = [4, 0.5];
  static SELECTED_ANNOTATION_BLUR = 3;
}
