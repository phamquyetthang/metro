/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

const fs = require('fs-extra');

import type {YargArguments} from 'metro-config/src/configTypes.flow';

exports.watchFile = async function(
  filename: string,
  callback: () => any,
): Promise<void> {
  fs.watchFile(filename, () => {
    callback();
  });

  await callback();
};

exports.makeAsyncCommand = (
  command: (argv: YargArguments) => Promise<mixed>,
): ((argv: YargArguments) => void) => (argv: YargArguments) => {
  Promise.resolve(command(argv)).catch(error => {
    console.error(error.stack);
    process.exitCode = 1;
  });
};
