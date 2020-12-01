<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Repository\ImageRepository;
use App\Entity\Image;

use App\Repository\UserRepository;
use App\Entity\User;

use App\Utils\LocalFiles;
use App\Utils\VisionApi;

class ImageApiController extends AbstractController
{
    /**
     *
     * @Route("/images/preload", methods={"POST"})
     */
    public function preload(
        Request $request, 
        SerializerInterface $serializer, 
        ImageRepository $imageRepository, 
        UserRepository $userRepository, 
        LocalFiles $fileRepository,
        VisionApi $visionApiRepository
        ){

        $requestContent = json_decode($request->getContent(), true);
        $images = $requestContent['files'];
        foreach($images as $image){

            $path = $fileRepository->save($image['data_url']);
            
            $labels = $visionApiRepository->getLabels($path);
            foreach($labels as $label){
                $imagelabels[] = $label;
            }

            $user = $userRepository->login($requestContent['email'], $requestContent['password']);

            $newImage = new Image();
            $newImage->setPath($path);
            $newImage->setSubmitted(false);
            $newImage->setUser($user);
            $savedImage = $imageRepository->save($newImage);
            $imageIds[] = $savedImage->id;
        }
        
        $collectedResponse['ids'] = $imageIds;
        $collectedResponse['labels'] = $imagelabels;

        $response = new JsonResponse($collectedResponse);
        return $response;
    }
}