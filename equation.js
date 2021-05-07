#!/usr/bin/env node
'use strict';

const fs = require('fs');
const glob = require('glob');
const set = require('lodash.set');

const getHierPath = fname => {
  const arr = fname.split('/');
  return arr.slice(5, -1);
};

glob(
  '../../google/skywater-pdk/libraries/*/*/cells/*/definition.json',
  async (er, files) => {
    const res = {};
    let count = 0;
    for (const file of files) {
      const text = await fs.promises.readFile(file, 'utf8');
      const body = JSON.parse(text);

      process.stderr.write(body.equation ? '+' : '.');
      const val = body.equation || '';
      set(res, getHierPath(file), val);
      if (body.equation !== undefined) {
        count++;
      }
    }
    console.error('\n' + count + '/' + files.length);
    console.log(JSON.stringify(res, null, 2));
  }
);
