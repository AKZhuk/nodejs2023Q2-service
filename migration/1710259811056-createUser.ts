// import { UserEntity } from 'src/user/entities/user.entity';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class GenerateUserData1612345678901 implements MigrationInterface {
//     private users: {
//         login: string;
//         password: string;
//     }[];

//     constructor () {
//         this.users = [
//             {
//                 login: 'AKZhuk',
//                 password: 'password1',
//             },
//             {
//                 login: 'Eminem',
//                 password: 'password2',
//             },
//             {
//                 login: 'Linkin park',
//                 password: 'password3',
//             },
//             {
//                 login: '30 Seconds to mars',
//                 password: 'password2',
//             },
//         ];
//     }

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.manager.save(UserEntity, this.users);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         // await queryRunner.manager.delete(
//         //     UserEntity,
//         //     this.users.map((user) => user.id),
//         // );
//     }
// }
