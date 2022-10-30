import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/build/package/ClassTransformer";

export abstract class BaseFactory {
  protected createEntity<E, P>(entity: ClassType<E>, plainObject: P): E {
    return plainToClass(entity, plainObject, {
      excludeExtraneousValues: true,
    }) as E;
  }

  protected createEntityArray<E, P>(
    entity: ClassType<E>,
    plainObjectArray: P[]
  ): E[] {
    return plainToClass(entity, plainObjectArray, {
      excludeExtraneousValues: true,
    });
  }
}
