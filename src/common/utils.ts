import bcrypt from 'bcrypt';
import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { ORDER } from '../constants';
import type { PageCursorDto } from './dto/page-cursor.dto';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: string | undefined,
  hash: string | undefined,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}

export function getVariableName<TResult>(getVar: () => TResult): string {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts[memberParts.length - 1];
}

export function sortAndPaginate<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  tableAlias: string,
  { sort, cursor, take }: PageCursorDto,
): SelectQueryBuilder<T> {
  if (cursor) {
    const compare = sort === ORDER.ASC ? '>=' : '<=';
    query = query.andWhere(`${tableAlias}.id ${compare} :cursor`, {
      cursor,
    });
  }

  query = query.orderBy(tableAlias + '.created_at', sort).limit(take + 1);

  return query;
}
