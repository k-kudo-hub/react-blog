import { plainToClass } from "class-transformer";

export abstract class BaseFactory {
  protected createEntity<E, P>(entity: any, plainObject: P): E {
    return plainToClass(entity, plainObject, {
      excludeExtraneousValues: true,
    }) as E;
  }

  protected createEntityArray<E, P>(entity: any, plainObjectArray: P[]): E[] {
    return plainToClass(entity, plainObjectArray, {
      excludeExtraneousValues: true,
    });
  }
}
