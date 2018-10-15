/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AtomicBlockUtils
 * @format
 * @flow
 */

'use strict'

import type { BlockNodeRecord } from './BlockNodeRecord'
import type { DraftInsertionType } from './DraftInsertionType'

import EditorState from './EditorState'
import type SelectionState from './SelectionState'

declare module 'draft-js/lib/AtomidBlockUtils' {
  declare export type AtomicBlockUtils = {
    insertAtomicBlock: (
      editorState: EditorState,
      entityKey: string,
      character: string
    ) => EditorState,
    moveAtomicBlock: (
      editorState: EditorState,
      atomicBlock: BlockNodeRecord,
      targetRange: SelectionState,
      insertionMode?: DraftInsertionType
    ) => EditorState,
  }
}
