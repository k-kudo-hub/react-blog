import { plainToInstance } from "class-transformer";

export abstract class BaseFactory {
  protected createEntity<E, P>(entity: any, plainObject: P): E {
    return plainToInstance(entity, plainObject, {
      excludeExtraneousValues: true,
    }) as E;
  }

  protected createEntityArray<E, P>(entity: any, plainObjectArray: P[]): E[] {
    return plainToInstance(entity, plainObjectArray, {
      excludeExtraneousValues: true,
    });
  }
}
