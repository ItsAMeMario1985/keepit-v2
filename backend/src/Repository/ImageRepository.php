<?php

namespace App\Repository;

use App\Entity\Image;
use App\Entity\Keepit;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Image|null find($id, $lockMode = null, $lockVersion = null)
 * @method Image|null findOneBy(array $criteria, array $orderBy = null)
 * @method Image[]    findAll()
 * @method Image[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Image::class);
    }

    public function save(Image $image): Image  {
        $this->_em->persist($image);
        $this->_em->flush();
        return $image;
    }

    public function findbyid(string $id): ?Image {
        return $this->findOneBy([
            'id' => $id,
        ]);
    }

   
}
